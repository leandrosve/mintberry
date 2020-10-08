import tasks from "../../backend/tasks";
import { DELETE_TASK_SUCCESS } from "../actions/types";

const initialState = tasks;

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case(DELETE_TASK_SUCCESS):
      return state.filter((task)=>task.id!==payload.id)
    default:
      return state;
  }
};

export const selectAll = (state) => state;

export const selectById = (state, id) => state.find((task)=>task.id===id);

export default reducer;
