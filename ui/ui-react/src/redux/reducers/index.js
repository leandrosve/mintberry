import { combineReducers } from "redux";
import modal, {selectors as modalSelectors} from "./modal";
import dialog from "./dialog";
import session, {selectors as sessionSelectors} from "./session";
import task, {selectors as taskSelectors}from "./task";
import notification, {selectors as notificationSelectors} from "./notification";

const combinedReducers = combineReducers({
  modal,
  task,
  dialog,
  notification,
  session,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = {notification: state.notification};
  }
  return combinedReducers(state, action);
};

export const selectModalIsOpen = (state) => modalSelectors.selectIsOpen(state.modal);

export const selectModalContentType = (state) =>
  modalSelectors.selectContentType(state.modal);

export const selectModalContentParams = (state) =>
  modalSelectors.selectContentParams(state.modal);

export const selectDialog = (state) => state.dialog;

export const selectSuccessNotifications = (state, concerns) =>
  notificationSelectors.selectSuccessNotifications(state.notification, concerns);

export const selectErrorNotifications = (state, concerns) =>
  notificationSelectors.selectErrorNotifications(state.notification, concerns);

export const selectIsRequestLoading = (state, concern) =>
  notificationSelectors.selectIsRequestLoading(state.notification, concern);

export const selectAllTasks = (state) => taskSelectors.selectAll(state.task);

export const selectVisibleTasks = (state) => taskSelectors.selectVisible(state.task);

export const selectTaskById = (state, id) =>
  taskSelectors.selectById(state.task, id);

export const selectTasksVisibilityFilter = (state) =>
  taskSelectors.selectVisibilityFilter(state.task);

export const selectActiveTasksCount = (state) =>
  taskSelectors.selectActiveCount(state.task);

  
export const selectFinishedTasksCount = (state) =>
taskSelectors.selectFinishedCount(state.task);

export const selectIsUserAuthenticated = (state) =>
  sessionSelectors.selectIsAuthenticated(state.session);

export const selectProfile = state => sessionSelectors.selectProfile(state.session);

export const selectUsername = state => sessionSelectors.selectUsername(state.session);


export const selectAccessToken = state => sessionSelectors.selectAccessToken(state.session);

export const selectRefreshToken = state => sessionSelectors.selectRefreshToken(state.session);

export default rootReducer;
