import { union } from "lodash";
import { createSelector } from "reselect";
import tasks from "../../backend/tasks";
import { ACTIVE } from "../../components/task/states";
import {
  ADD_TASK_SUCCESS,
  SET_TASKS_VISIBILITY_FILTER,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
} from "../actions/types";

const initialState = {
  allTasks: tasks,
  visibilityFilter: "ALL",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TASK_SUCCESS:
      return { ...state, allTasks: allTasks(state.allTasks, action) };
    case ADD_TASK_SUCCESS:
      return { ...state, allTasks: allTasks(state.allTasks, action) };
    case DELETE_TASK_SUCCESS:
      return { ...state, allTasks: allTasks(state.allTasks, action) };
    case SET_TASKS_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.payload };
    default:
      return state;
  }
};

const allTasks = (state = tasks, { type, payload }) => {
  switch (type) {
    case EDIT_TASK_SUCCESS:
      return state.map((task) =>
        task.id === payload.task.id ? payload.task : task
      );
    case ADD_TASK_SUCCESS:
      return union(state, [payload.task]);
    case DELETE_TASK_SUCCESS:
      return state.filter((task) => task.id !== payload.id);
    default:
      return state;
  }
};

export const selectAll = (state) =>
  state.allTasks.sort((a, b) => (a.createdAt < b.createdAt ? 1 : 0));

export const selectById = (state, id) =>
  state.allTasks.find((task) => task.id === id);

export const selectVisibilityFilter = (state) => state.visibilityFilter;

export const selectVisible = createSelector(
  selectAll,
  selectVisibilityFilter,
  (tasks, visibilityFilter) =>{
    return visibilityFilter === "ALL" ? tasks : tasks.filter((task) => task.state === visibilityFilter)
  }
);

export const selectActiveCount = (state) =>
  state.allTasks.reduce((count, { state }) => {
    return state === ACTIVE ? ++count : count;
  }, 0);

export default reducer;
