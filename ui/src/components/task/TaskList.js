import React from "react";
import PropTypes from "prop-types";
import { Container } from "bloomer/lib/layout/Container";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTasks } from "../../redux/reducers";
import NotificationContainer from "../../containers/NotificationContainer";
import { DELETE_TASK_REQUEST } from "../../redux/actions/types";
import TaskDetail from "./TaskDetail";
import { useTranslation } from "react-i18next";
import { Button } from "bloomer/lib/elements/Button";
import { Title } from "bloomer/lib/elements/Title";
import FlexBox from "../util/FlexBox";
import { Level } from "bloomer/lib/components/Level/Level";
import { LevelLeft } from "bloomer/lib/components/Level/LevelLeft";
import { LevelRight } from "bloomer/lib/components/Level/LevelRight";
import { Icon } from "bloomer/lib/elements/Icon";
import { openTaskForm } from "../../redux/actions/modal";

const concerns = [DELETE_TASK_REQUEST];
const TaskList = () => {
  const tasks = useSelector((state) => selectAllTasks(state));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Container>
      <Level>
        <LevelLeft>
          <Title>{t("tasks")}</Title>
        </LevelLeft>
        <LevelRight>
          <Button onClick={()=>dispatch(openTaskForm())}><Icon className="fas fa-plus"/><span>{t("actions.taskAdd")}</span></Button>
        </LevelRight>
      </Level>
      <NotificationContainer concerns={concerns} />
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </Container>
  );
};

TaskList.propTypes = {};

export default TaskList;
