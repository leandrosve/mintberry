import i18next from "i18next";
import { openDialog } from "./dialog";
import { closeModal } from "./modal";
const { DELETE_TASK_SUCCESS } = require("./types");

export const askDeleteTaskConfirmation = (id) =>
  openDialog({
    message: i18next.t("confirmation.taskDelete"),
    pendingFunctionAlias: "deleteTask",
    isDispatchable: true,
    functionParams: id,
  });

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(closeModal())
    dispatch(deleteTaskSuccess(id));
  };
};

const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: {
    id: id,
  },
  successMessage:"success.taskDelete",
});
