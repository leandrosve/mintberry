import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDialog } from "../redux/reducers";
import { deleteTask } from "../redux/actions/task";
import Dialog from "../components/layout/Dialog";
import { closeDialog } from "../redux/actions/dialog";

const CONFIRMABLE_FUNCTIONS = { deleteTask };

const DialogContainer = () => {
  const {
    isOpen,
    message,
    pendingFunctionAlias,
    isDispatchable,
    functionParams,
  } = useSelector((state) => selectDialog(state));
  const pendingFunction = CONFIRMABLE_FUNCTIONS[pendingFunctionAlias];
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeDialog());
  const handleAccept = () => {
    if (pendingFunction) {
      isDispatchable
        ? dispatch(pendingFunction(functionParams))
        : pendingFunction(functionParams);
    }
    handleClose();
  };
  return (
    <>
      {isOpen && (
        <Dialog
          message={message}
          isOpen={isOpen}
          handleAccept={handleAccept}
          handleCancel={handleClose}
        />
      )}
    </>
  );
};

export default DialogContainer;
