import React from "react";
import { Container } from "bloomer/lib/layout/Container";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleTasks } from "../../redux/reducers";
import NotificationContainer from "../../containers/NotificationContainer";
import { ADD_TASK_REQUEST, DELETE_TASK_REQUEST } from "../../redux/actions/types";
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

const concerns = [DELETE_TASK_REQUEST, ADD_TASK_REQUEST];
const TaskList = () => {
  const tasks = useSelector((state) => selectVisibleTasks(state));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Container>
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
     
      {tasks.length === 0 && <Subtitle className="m-3">{t("noTasks")}</Subtitle>}
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}    
    </Container>
  );
};

export default TaskList;
