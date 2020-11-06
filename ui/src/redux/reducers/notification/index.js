import { combineReducers } from "redux";
import success, * as fromSuccess from "./success";
import error, * as fromError from "./error";

import loading, * as fromLoading from "./loading";

const notification = combineReducers({success, error, loading});

const selectSuccessNotifications = (state, concerns) =>  fromSuccess.selectByConcerns(state.success, concerns);

const selectErrorNotifications = (state, concerns) =>  fromError.selectByConcerns(state.error, concerns);

const selectIsRequestLoading= (state, concern) =>  fromLoading.selectByConcern(state.loading, concern);

export const selectors = {
    selectSuccessNotifications,
    selectErrorNotifications,
    selectIsRequestLoading
}

export default notification;