import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_PROFILE_SUCCESS, REFRESH_TOKEN_SUCCESS } from "../actions/types";
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
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return {
    user: user,
    isAuthenticated: auth.accessToken ? true : false,
    auth: {
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken,
    },
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {    
    case FETCH_PROFILE_SUCCESS:
      return {...state, user:payload}
    case LOGIN_REQUEST:
    case LOGIN_FAILURE:
      return initialState;
    case LOGIN_SUCCESS:
    case REFRESH_TOKEN_SUCCESS:
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

const selectIsAuthenticated = state => state.isAuthenticated;
const selectAccessToken = state => state.auth.accessToken;
const selectRefreshToken = state => state.auth.refreshToken;
const selectProfile = state => state.user;
const selectUsername = state => (selectProfile(state) || {}).username;
export const selectors = {
  selectAccessToken,
  selectRefreshToken,
  selectIsAuthenticated,
  selectProfile,
  selectUsername,
}

export default reducer;
