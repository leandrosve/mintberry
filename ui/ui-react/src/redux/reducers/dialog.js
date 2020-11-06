import { CLOSE_DIALOG, OPEN_DIALOG} from "../actions/types";

const initialState = {
  isOpen: false,
  message: null,
  pendingFunctionAlias: null,
  functionParams: null,
  isDispatchable: false,
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case OPEN_DIALOG:
      return { ...payload, isOpen: true};
    case CLOSE_DIALOG:
      return initialState;
    default:
      return state;
  }
};

export const selectIsOpen = (state) => state.isOpen;

export default reducer;
