import i18next from "i18next";
import { ACTIVE, FINISHED, PAUSED, STOPPED } from "../../components/task/states";
import { selectTaskById } from "../reducers";
import { openDialog } from "./dialog";
import { closeModal } from "./modal";
const {
  DELETE_TASK_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  SET_TASKS_VISIBILITY_FILTER,
} = require("./types");

export const addTask = (task) => {
  return (dispatch) => {
    dispatch(closeModal());
    const time = new Date().getTime();
    dispatch(addTaskSuccess({ ...task, createdAt: time, startedAt:time, state: ACTIVE }));
  };
};

const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: {
    task,
  },
  successMessage: "success.taskAdd",
});

export const startTask = (taskId) => {
  return (dispatch, getState) => {
    const task = selectTaskById(getState(), taskId);
    dispatch(
      editTaskSuccess({ ...task, startedAt: task.startedAt ? task.startedAt : new Date().getTime(), state: ACTIVE })
    );
  };
};

export const pauseTask = (taskId) => {
  return (dispatch, getState) => {
    const task = selectTaskById(getState(), taskId);
    dispatch(editTaskSuccess({ ...task, state: PAUSED }));
  };
};

export const finishTask = (taskId) => {
  return (dispatch, getState) => {
    const task = selectTaskById(getState(), taskId);
    dispatch(editTaskSuccess({ ...task, state: FINISHED, finishedAt: new Date().getTime()}));
  };
};


export const stopTask = (taskId) => {
  return (dispatch, getState) => {
    const task = selectTaskById(getState(), taskId);
    dispatch(editTaskSuccess({ ...task, state: STOPPED }));
  };
};

const editTaskSuccess = (task) => ({
  type: EDIT_TASK_SUCCESS,
  payload: {
    task,
  },
});

export const askDeleteTaskConfirmation = (id) =>
  openDialog({
    message: i18next.t("confirmation.taskDelete"),
    pendingFunctionAlias: "deleteTask",
    isDispatchable: true,
    functionParams: id,
  });

export const askStopTaskConfirmation = (id) =>
  openDialog({
    message: i18next.t("confirmation.taskStop"),
    pendingFunctionAlias: "stopTask",
    isDispatchable: true,
    functionParams: id,
  });

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(closeModal());
    dispatch(deleteTaskSuccess(id));
  };
};

const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: {
    id: id,
  },
  successMessage: "success.taskDelete",
});


export const setVisibilityFilter = (filter) => ({
  type: SET_TASKS_VISIBILITY_FILTER,
  payload: filter
  ,
});