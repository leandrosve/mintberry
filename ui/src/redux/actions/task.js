import i18next from "i18next";
import { openDialog } from "./dialog";
import { closeModal } from "./modal";
import API from "../../api";
const {
  DELETE_TASK_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  SET_TASKS_VISIBILITY_FILTER,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_FAILURE,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  EDIT_TASK_FAILURE,
  ADD_TASK_FAILURE,
  EDIT_TASK_REQUEST,
} = require("./types");



export const fetchTasks = () => {
  return (dispatch) => {
    dispatch(fetchTasksRequest());
    API.get("/tasks").then(({ data }) => dispatch(fetchTasksSuccess(data))).catch(err => fetchTasksFailure(err));
  };
};

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (message) => ({
  type: FETCH_TASKS_FAILURE,
  payload: { message: message },
});

export const addTask = ({title, description, expiresAt, image}) => {
  return async (dispatch) => {
    try {
      const {data} = await API.post("/tasks", {title, description, expiresAt, image});
      dispatch(addTaskSuccess(data))
      dispatch(closeModal());
    } catch (error) {
      dispatch(addTaskFailure(error));
    }    
  };
};

const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: {
    task,
  },
  successMessage: "success.taskAdd",
});

const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error || {message: "error.taskAdd"},
})

export const startTask = (taskId) => changeTaskStatus(taskId, "start")

export const pauseTask = (taskId) => changeTaskStatus(taskId, "pause")

export const finishTask = (taskId) => changeTaskStatus(taskId, "finish")

export const stopTask = (taskId) => changeTaskStatus(taskId, "cancel")

const changeTaskStatus = (taskId, action) => {
  return async (dispatch) => {
    try {
      dispatch(editTaskRequest());
      const {data} = await API.post(`/tasks/${taskId}/${action}`)
      dispatch(editTaskSuccess(data));
    } catch (error) {
      dispatch(editTaskFailure(error || {message:"error.taskStatus"}))
    }
  };
}

const editTaskRequest = () => ({
  type: EDIT_TASK_REQUEST,
})
const editTaskSuccess = (task) => ({
  type: EDIT_TASK_SUCCESS,
  payload: {
    task,
  },
});

const editTaskFailure = (error) => ({
  type: EDIT_TASK_FAILURE,
  payload: error 
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
  return async (dispatch) => {
    dispatch(deleteTaskRequest());
    try {
      await API.delete(`/tasks/${id}`);
      dispatch(closeModal());
      dispatch(deleteTaskSuccess(id));
    } catch (error) {
      dispatch(deleteTaskFailure(error))
    }
  };
};

const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: {
    id: id,
  },
  successMessage: "success.taskDelete",
});

const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error || {message:"error.taskDelete"}
});

const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST
});


export const setVisibilityFilter = (filter) => ({
  type: SET_TASKS_VISIBILITY_FILTER,
  payload: filter
  ,
});