import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";
const initialState = {
  user: null,
  isAuthenticated: false,
  auth: {
    accessToken: null,
    refreshToken: null,
  },
};

export const loadInitialState = () => {
  const auth = JSON.parse(localStorage.getItem("auth")) || {};
  return {
    user: null,
    isAuthenticated: auth.accessToken ? true : false,
    auth: {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    },
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case LOGIN_FAILURE:
      return initialState;
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated:true,
        auth: {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        },
      };
    default: 
      return state
  }
};

export const selectIsAuthenticated = state => state.isAuthenticated;
export const selectAccessToken = state => state.isAuthenticated; 

export default reducer;
