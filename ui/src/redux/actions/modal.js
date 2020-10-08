import { CLOSE_MODAL, OPEN_MODAL } from "./types";

const openModal = (contentType, params) => ({
    type:OPEN_MODAL,
    payload:{
        contentType: contentType,
        contentParams: params,
    }
})

export const closeModal = () => ({
    type:CLOSE_MODAL  
})

export const openLoginForm = () => openModal("LoginForm")

export const openRegisterForm = () => openModal("SignupForm")

export const openStoreForm = () => openModal("StoreForm")

export const openProductForm = () => openModal("ProductForm")

export const openTaskDetail = (taskId) => openModal("TaskDetail", {id:taskId})


export const openTaskForm = () => openModal("TaskForm")

