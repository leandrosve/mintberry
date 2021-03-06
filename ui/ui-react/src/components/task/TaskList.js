import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "bloomer/lib/layout/Container";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTasksVisibilityFilter,
  selectVisibleTasks,
} from "../../redux/reducers";
import NotificationContainer from "../../containers/NotificationContainer";
import {
  ADD_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  FETCH_TASKS_REQUEST,
} from "../../redux/actions/types";
import { useTranslation } from "react-i18next";
import { Button } from "bloomer/lib/elements/Button";
import { Title } from "bloomer/lib/elements/Title";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Icon } from "bloomer/lib/elements/Icon";
import { openTaskForm } from "../../redux/actions/modal";
import TaskFilter from "./TaskFilter";
import { Subtitle } from "bloomer/lib/elements/Subtitle";
import { selectIsRequestLoading } from "../../redux/reducers";
import Spinner from "../util/Spinner";
import Pagination from "../util/Pagination";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactTooltip from "react-tooltip";

const concerns = [DELETE_TASK_REQUEST, ADD_TASK_REQUEST, FETCH_TASKS_REQUEST];

const TASKS_PER_PAGE = 5;

const getPageCount = (tasksLength) => Math.ceil(tasksLength / TASKS_PER_PAGE);
const TaskList = () => {
  const tasks = useSelector((state) => selectVisibleTasks(state) || []);
  const filter = useSelector((state) => selectTasksVisibilityFilter(state));

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector((state) =>
    selectIsRequestLoading(state, FETCH_TASKS_REQUEST)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = useCallback((page) => setCurrentPage(page), [
    setCurrentPage,
  ]);

  useEffect(()=>{
    const lastPage=getPageCount(tasks.length)
    if(currentPage > lastPage)
      setCurrentPage(lastPage)
  },[tasks.length, currentPage, setCurrentPage])

  useEffect(() => {
    setCurrentPage(1);
    ReactTooltip.rebuild();
  }, [filter]);

  const viewRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (tasks.length > 0 && viewRef.current)
        viewRef.current.scrollIntoView({block: "start", behavior:"smooth"});
    }, 700);
  }, [filter, viewRef, tasks.length]);
  return (
    <Container>
      <div ref={viewRef}/>
      <Title>{t("tasks")}</Title>
      <Level>
        <LevelLeft>
          <TaskFilter/>
        </LevelLeft>
        <LevelRight>
          <Button onClick={() => dispatch(openTaskForm())}>
            <Icon className="fas fa-plus" />
            <span>{t("actions.taskAdd")}</span>
          </Button>
        </LevelRight>
      </Level>
      <NotificationContainer concerns={concerns} />
      <Spinner isVisible={loading} />
      {!loading && tasks.length === 0 && (
        <Subtitle className="m-3">{t("noTasks")}</Subtitle>
      )}
    
      <TransitionGroup className="fade">
        {!loading &&
          tasks.slice((currentPage - 1) * TASKS_PER_PAGE, (currentPage +1 )* TASKS_PER_PAGE).map((task) => {
            return(
            <CSSTransition
              key={task.id}
              in={true}
              appear={true}
              timeout={500}
              classNames="fade"
            >
              <TaskCard key={task.id} id={task.id} />
            </CSSTransition>
          )})}
      </TransitionGroup>
      <Pagination
        className="mt-4"
        pageCount={getPageCount(tasks.length)}
        currentPage={currentPage}
        handleClick={handlePageClick}
      />
    </Container>
  );
};

export default TaskList;
