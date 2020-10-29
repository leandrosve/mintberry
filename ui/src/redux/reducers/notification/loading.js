import { omit } from "lodash";

const reducer = (state = {}, action) => {
  if (action.type.endsWith("_REQUEST")) {
    return { ...state, [action.type]: true };
  }

  if (action.type.endsWith("_FAILURE")) {
    const requestName = action.type.replace("_FAILURE", "_REQUEST");
    return omit(state, [requestName]);
  }
  if (action.type.endsWith("_SUCCESS")) {
    const requestName = action.type.replace("_SUCCESS", "_REQUEST");
    return omit(state, [requestName]);
  }
  return state;
};

export const selectByConcern = (state, concern) => state[concern]; 

export default reducer;
