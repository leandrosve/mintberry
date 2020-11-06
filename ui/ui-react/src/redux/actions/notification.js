import { CLEAR_SUCCESS_NOTIFICATIONS, CLEAR_ERROR_NOTIFICATIONS } from "./types"

export const clearSuccessNotifications = (concerns)=>({
    type:CLEAR_SUCCESS_NOTIFICATIONS,
    payload: concerns,
    
})

export const clearErrorNotifications = (concerns)=>({
    type:CLEAR_ERROR_NOTIFICATIONS,
    payload: concerns,
})
