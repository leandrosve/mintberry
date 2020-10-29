import { combineReducers } from "redux";
import modal, * as fromModal from "./modal";
import dialog from "./dialog";
import session, * as fromSession from "./session";
import task, * as fromTask from "./task";
import notification, * as fromNotification from "./notification";

const combinedReducers = combineReducers({
  modal,
  task,
  dialog,
  notification,
  session,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

export const selectModalIsOpen = (state) => fromModal.selectIsOpen(state.modal);

export const selectModalContentType = (state) =>
  fromModal.selectContentType(state.modal);

export const selectModalContentParams = (state) =>
  fromModal.selectContentParams(state.modal);

export const selectDialog = (state) => state.dialog;

export const selectSuccessNotifications = (state, concerns) =>
  fromNotification.selectSuccessNotifications(state.notification, concerns);

export const selectErrorNotifications = (state, concerns) =>
  fromNotification.selectErrorNotifications(state.notification, concerns);

export const selectIsRequestLoading = (state, concern) =>
  fromNotification.selectIsRequestLoading(state.notification, concern);

export const selectAllTasks = (state) => fromTask.selectAll(state.task);

export const selectVisibleTasks = (state) => fromTask.selectVisible(state.task);

export const selectTaskById = (state, id) =>
  fromTask.selectById(state.task, id);

export const selectTasksVisibilityFilter = (state) =>
  fromTask.selectVisibilityFilter(state.task);

export const selectActiveTasksCount = (state) =>
  fromTask.selectActiveCount(state.task);

export const selectIsUserAuthenticated = (state) =>
  fromSession.selectIsAuthenticated(state.session);

export default rootReducer;
