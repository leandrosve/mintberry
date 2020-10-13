import { combineReducers } from "redux";
import success, * as fromSuccess from "./success";

const notification = combineReducers({success});

export const selectSuccessNotifications = (state, concerns) =>  fromSuccess.selectByConcerns(state.success, concerns);

export default notification;