import { combineReducers } from "redux";
import modal, * as fromModal from "./modal";
import dialog from "./dialog";
import task, * as fromTask from "./task";
import notification, * as fromNotification from "./notification";

const reducer = combineReducers({modal, task, dialog, notification}); 

export const selectModalIsOpen = state => fromModal.selectIsOpen(state.modal);

export const selectModalContentType = state => fromModal.selectContentType(state.modal);

export const selectModalContentParams = state => fromModal.selectContentParams(state.modal);

export const selectDialog = state => state.dialog;

export const selectSuccessNotifications = (state, concerns) => fromNotification.selectSuccessNotifications(state.notification, concerns); 

export const selectAllTasks = state => fromTask.selectAll(state.task)

export const selectVisibleTasks = state => fromTask.selectVisible(state.task)

export const selectTaskById = (state, id) => fromTask.selectById(state.task, id)

export const selectTasksVisibilityFilter = state => fromTask.selectVisibilityFilter(state.task)

export const selectActiveTasksCount = state => fromTask.selectActiveCount(state.task)

export default reducer;
