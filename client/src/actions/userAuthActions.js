import { USER_AUTH_TYPES } from "../constants";

const {
  LOGIN: { LOAD_LOGIN, LOAD_LOGGGED_USER },
  SIGNUP: { LOAD_SIGNUP, LOAD_SIGNED_UP_USER },
  USER_STATUS: { IS_LOGGED_IN, LOAD_ACCREDITATION, LOAD_USER, GET_USER },
  USER_LOGOUT: { LOAD_LOGOUT },
  USER_PASSWORD: { LOAD_FORGOT_PASSWORD, LOAD_RESET_PASSWORD },
  USER_UPDATE: { USER_PASSWORD_CHANGE },
} = USER_AUTH_TYPES;

export const loadLogin = () => ({
  type: LOAD_LOGIN,
});

export const loginUser = (response) => ({
  type: LOAD_LOGGGED_USER,
  response,
});

export const loadSignUp = () => ({ type: LOAD_SIGNUP });

export const signUpUser = (response) => ({
  type: LOAD_SIGNED_UP_USER,
  response,
});

export const loadUser = () => ({ type: LOAD_USER });
export const getUser = (user) => ({ type: GET_USER, user });

// Global user logged status tracker

export const loadAccreditation = () => ({ type: LOAD_ACCREDITATION });

export const userAccredited = (isSigned) => ({
  type: IS_LOGGED_IN,
  isSigned,
});

// Logout will clear cookie
export const loadLogout = () => ({ type: LOAD_LOGOUT });

// Forgot Password
export const loadForgotPassword = () => ({ type: LOAD_FORGOT_PASSWORD });

export const loadResetPassword = () => ({ type: LOAD_RESET_PASSWORD });

// User Update
export const userPasswordUpdate = (data) => ({
  type: USER_PASSWORD_CHANGE,
  data,
});
