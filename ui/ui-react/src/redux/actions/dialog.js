import { CLOSE_DIALOG, OPEN_DIALOG } from "./types";

export const openDialog = (payload) => ({
    type:OPEN_DIALOG,
    payload:payload
})

export const closeDialog = () => ({
    type:CLOSE_DIALOG
})



