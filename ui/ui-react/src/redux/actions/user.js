import { openLoginForm } from "./modal";
import { SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS } from "./types";
import API from "../../api";

const signupRequest = () =>({
    type:SIGNUP_REQUEST
})

const signupSuccess = () =>({
    type:SIGNUP_SUCCESS,
    successMessage:"success.signup"
})

const signupFailure = (error) =>({
    type:SIGNUP_FAILURE,
    payload:error
})

export const signup = ({ username, email, password, passwordConfirmation }) => {
    return async (dispatch) => {
      dispatch(signupRequest());
      API.post("/users/signup", { username, email, password, passwordConfirmation })
        .then(({ data }) => {
          dispatch(openLoginForm());
          dispatch(signupSuccess(data));       
        })
        .catch((err) => {
          dispatch(signupFailure(err));
        });
    };
  };