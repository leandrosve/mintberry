import { CLOSE_MODAL, OPEN_MODAL } from "../actions/types";

const initialState = {
  isOpen: false,
  contentType: null,
  contentParams: null,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case OPEN_MODAL:
      return { isOpen: true, contentParams:payload.contentParams, contentType: payload.contentType };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export const selectIsOpen = (state) => state.isOpen;
export const selectContentParams = (state) => state.contentParams;
export const selectContentType = (state) => state.contentType;

export default reducer;
