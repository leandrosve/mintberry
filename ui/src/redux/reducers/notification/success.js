import { omit } from "lodash";
import {
  CLEAR_SUCCESS_NOTIFICATIONS,
  CLEAR_ALL_NOTIFICATIONS,
} from "../../actions/types";

const success = (state = {}, action) => {
  if (
    action.type === CLEAR_SUCCESS_NOTIFICATIONS ||
    action.type === CLEAR_ALL_NOTIFICATIONS
  ) {
    const requestTypes = action.payload;
    return omit(state, requestTypes);
  }

  if (action.type.endsWith("_REQUEST") || action.type.endsWith("_FAILURE")) {
    const requestName = action.type.replace("_FAILURE", "_REQUEST");
    return omit(state, [requestName]);
  }

  if (action.type.endsWith("_SUCCESS")) {
    const requestName = action.type.replace("_SUCCESS", "_REQUEST");
    return { ...state, [requestName]: action.successMessage };
  }
  return state;
};

export const selectByConcerns = (state, concerns) =>{ 
  const found = concerns.find((concern)=>!!state[concern]);
  return found ? state[found] : null;
}

export default success;
