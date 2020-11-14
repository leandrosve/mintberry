import {
  FETCH_PROFILE_FAILURE,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
} from "./types";
import API from "../../api";
import { closeModal } from "./modal";
import { selectRefreshToken } from "../reducers";

export const logout = () => {
  return async (dispatch, getStore) => {
    try {
      const refreshToken = selectRefreshToken(getStore());
      await API.post(
        "/users/logout",
        { refreshToken },
        { skipAuthRefresh: true }
      );
     
    } catch (error) {}
    finally{
      dispatch(destroySession());
    }
  };
};

export const refreshTokenSuccess = ({ refreshToken, accessToken }) => {
  return (dispatch) => {
    localStorage.setItem("auth", JSON.stringify({refreshToken, accessToken}));
    dispatch({
      type: REFRESH_TOKEN_SUCCESS,
      payload: { refreshToken, accessToken },
    });
  };
};

export const refreshTokenFailure = () => {
  return (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN_FAILURE,
      payload: { message: "error.sessionExpired" },
    });
    setTimeout(() => dispatch(destroySession()), 400);
  };
};

export const destroySession = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  };
};

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = ({ accessToken, refreshToken }) => ({
  type: LOGIN_SUCCESS,
  payload: {
    accessToken,
    refreshToken,
  },
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    API.post("/users/login", { email, password }, { skipAuthRefresh: true })
      .then(({ data }) => {
        localStorage.setItem("auth", JSON.stringify(data));
        dispatch(closeModal());
        dispatch(fetchProfile());
        dispatch(loginSuccess(data));
      })
      .catch((err) => {
        dispatch(loginFailure(err));
      });
  };
};

export const fetchProfile = () => {
  return async (dispatch) => {
    dispatch(fetchProfileRequest());
    API.get("/users/me")
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(fetchProfileSuccess(data));
      })
      .catch((err) => {
        dispatch(fetchProfileFailure(err));
      });
  };
};

const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

const fetchProfileSuccess = (user) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: user,
});

const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});
