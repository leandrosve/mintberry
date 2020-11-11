import React from "react";
import Modal from "../components/layout/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/actions/modal";
import {
  selectModalContentParams,
  selectModalContentType,
  selectModalIsOpen,
} from "../redux/reducers";
import LoginForm from "../components/user/LoginForm";
import SignupForm from "../components/user/SignupForm";
import StoreForm from "../components/store/StoreForm";
import TaskDetail from "../components/task/TaskDetail";
import TaskForm from "../components/task/TaskForm";
import EditTaskForm from "../components/task/EditTaskForm";

const MODAL_COMPONENTS = { LoginForm, SignupForm, StoreForm, TaskDetail, TaskForm, EditTaskForm};

const ModalContainer = () => {
  const isOpen = useSelector((state) => selectModalIsOpen(state));
  const contentType = useSelector((state) => selectModalContentType(state));
  const contentParams = useSelector((state) => selectModalContentParams(state));
  const dispatch = useDispatch();
  const ModalContent = MODAL_COMPONENTS[contentType];
  return (
    <Modal isOpen={isOpen} handleClose={() => dispatch(closeModal())}>     
      {isOpen && <ModalContent {...contentParams} />}
    </Modal>
  );
};

export default ModalContainer;
