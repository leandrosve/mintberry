import { CLEAR_SUCCESS_NOTIFICATIONS } from "./types"

export const clearSuccessNotifications = (concerns)=>({
    type:CLEAR_SUCCESS_NOTIFICATIONS,
    payload: concerns,
    
})