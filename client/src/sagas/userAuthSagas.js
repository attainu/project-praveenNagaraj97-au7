import {
  call,
  select,
  put,
  delay,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";

import { USER_AUTH_TYPES, COOKIE_NAMES } from "../constants";
import history from "../history";
import {
  loginUser,
  signUpUser,
  userAccredited,
  getUser,
  authLoading,
} from "../actions";
import {
  UserLogger,
  UserSigner,
  AuthAccreditation,
  forgotPassword,
  resetPassword,
  getUser as getUserApi,
  updateUserPassword,
} from "../api";
import { useCookies } from "../utils/useCookies";
import { useSessionStorage } from "../utils/useSessionStorage";
import {
  globalErrorMessageHandler,
  globalSuccessMessageHandler,
} from "./HandleAlertSagas";

const { setAuthCookie, getCookie, removeCookie } = useCookies;
const { setSessionItem, getSessionItem, removeSessionItem } = useSessionStorage;
const {
  LOGIN: { LOAD_LOGIN },
  SIGNUP: { LOAD_SIGNUP },
  USER_STATUS: { LOAD_ACCREDITATION, LOAD_USER },
  USER_LOGOUT: { LOAD_LOGOUT },
  USER_PASSWORD: { LOAD_FORGOT_PASSWORD, LOAD_RESET_PASSWORD },
  USER_UPDATE: { USER_PASSWORD_CHANGE },
} = USER_AUTH_TYPES;

const { AUTH_TOKEN } = COOKIE_NAMES;

const getFormValues = ({ form }) => form;

function* handleUserLoginWorker() {
  yield put(authLoading(true));
  // Get Form Values for Store

  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);
  //   Check If the form is filled with valid details.
  // API has this error handling feature
  // But we are doing this on client side to avoid over fetching.
  if (values) {
    if (!values.hasOwnProperty("email")) {
      yield call(globalErrorMessageHandler, "Please Enter Email👻");
      return yield put(authLoading(false));
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      yield call(globalErrorMessageHandler, "Please Enter Valid Email👻");
      return yield put(authLoading(false));
    } else if (!values.hasOwnProperty("password")) {
      yield call(globalErrorMessageHandler, "Please Enter Password👻");
      return yield put(authLoading(false));
    }
  } else {
    yield call(globalErrorMessageHandler, "Please Enter Email and Password 👻");

    return yield put(authLoading(false));
  }

  //   Once Field Check is done call API!
  try {
    const { data } = yield call(
      UserLogger,
      values.email,
      values.password,
      values.signedIn ? "infinite" : "24h"
    );

    yield put(loginUser(data));
    yield call(globalSuccessMessageHandler, "Logged In Successfully🐱‍🏍");
    yield put(authLoading(false));
    yield history.goBack();
    // If keep-logged in checked store as cookie else in session-storage
    if (values.signedIn) {
      yield call(
        setAuthCookie,
        AUTH_TOKEN,
        data.token,
        values.signedIn ? "infinite" : "24"
      );
    } else {
      // set auth_token under session storage.
      yield call(setSessionItem, AUTH_TOKEN, data.token);
    }

    yield call(handleUserAccreditationWorker);
    yield delay(3200);
    yield call(globalSuccessMessageHandler, null);
  } catch (err) {
    yield console.clear();
    yield put(authLoading(false));
    try {
      yield call(globalErrorMessageHandler, err.response.data.message + "🙃");
    } catch (err) {
      yield call(
        globalErrorMessageHandler,
        "Something went wrong🤯 try again later⌛"
      );
    }
  }
}

export function* userLoginWatcher() {
  yield takeLatest(LOAD_LOGIN, handleUserLoginWorker);
}

function* handleUserSignUpWorker() {
  yield put(authLoading(true));
  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);
  if (values) {
    if (!values.hasOwnProperty("name")) {
      yield call(globalErrorMessageHandler, "Please Enter Name👻");
      return yield put(authLoading(false));
    } else if (!values.hasOwnProperty("signUpemail")) {
      yield call(globalErrorMessageHandler, "Please Enter Email");
      return yield put(authLoading(false));
    } else if (!/\S+@\S+\.\S+/.test(values.signUpemail)) {
      yield call(globalErrorMessageHandler, "Please Enter Valid Email👻");
      return yield put(authLoading(false));
    } else if (!values.hasOwnProperty("phoneNumber")) {
      yield call(globalErrorMessageHandler, "Please Enter Phone Number");
      return yield put(authLoading(false));
    } else if (
      String(values.phoneNumber).length !== 10 ||
      !String(values.phoneNumber).charAt(0) > 6 ||
      !Number.isInteger(Number(values.phoneNumber))
    ) {
      yield call(globalErrorMessageHandler, "Please Enter Valid Phone Number");
      return yield put(authLoading(false));
    } else if (!values.hasOwnProperty("signUppassword")) {
      yield call(globalErrorMessageHandler, "Please Enter Password👻");
      return yield put(authLoading(false));
    } else if (!values.hasOwnProperty("confirmPassword")) {
      yield call(globalErrorMessageHandler, "Please Confirm Your Password👻");
      return yield put(authLoading(false));
    } else if (values.signUppassword !== values.confirmPassword) {
      yield call(globalErrorMessageHandler, "Password Didn't match👻");
      return yield put(authLoading(false));
    }
  } else {
    yield call(globalErrorMessageHandler, "Please Fill the Form👻");
    return yield put(authLoading(false));
  }

  try {
    const { data } = yield call(
      UserSigner,
      values.name,
      values.signUpemail,
      values.signUppassword,
      values.confirmPassword,
      values.phoneNumber
    );

    yield put(signUpUser(data));
    yield call(globalSuccessMessageHandler, "Thank You ,keep shopping!🐱‍🏍");
    yield put(authLoading(false));
    yield call(setSessionItem, AUTH_TOKEN, data.token);
    yield history.goBack();
    yield call(handleUserAccreditationWorker);
    yield call(globalSuccessMessageHandler, null);
  } catch (err) {
    yield console.clear();
    yield put(authLoading(false));
    try {
      if (err.response.data.message.split(": ")[1] === "email") {
        return yield call(
          globalErrorMessageHandler,
          `User with ${values.signUpemail} already exist`
        );
      }
      if (err.response.data.message.split(": ")[1] === "phoneNumber") {
        return yield call(
          globalErrorMessageHandler,
          `User with ${values.phoneNumber} already exist`
        );
      }
      yield call(globalErrorMessageHandler, err.response.data.message + "🙃");
    } catch (err) {
      yield call(
        globalErrorMessageHandler,
        "Something went wrong🤯 try again later⌛"
      );
    }
  }
}

export function* userSignUpWatcher() {
  yield takeLatest(LOAD_SIGNUP, handleUserSignUpWorker);
}

function* handleUserAccreditationWorker() {
  const authCookie = yield call(getCookie, AUTH_TOKEN);
  const sessionCookie = yield call(getSessionItem, AUTH_TOKEN);

  if (!authCookie && !sessionCookie) return yield put(userAccredited({}));

  try {
    const { data } = yield call(AuthAccreditation, authCookie || sessionCookie);

    yield put(userAccredited(data));
  } catch (err) {
    // yield console.clear();
    yield put(userAccredited({}));
    yield removeCookie(AUTH_TOKEN);
  }
}

export function* userAccreditationWatcher() {
  yield takeEvery(LOAD_ACCREDITATION, handleUserAccreditationWorker);
}

function* handleUserLogoutWorker() {
  yield call(removeCookie, AUTH_TOKEN);
  yield call(removeSessionItem, AUTH_TOKEN);
  yield call(handleUserAccreditationWorker);

  yield history.push("/");

  yield call(
    globalSuccessMessageHandler,
    "Logged Out Successfully, come back soon!🐱‍"
  );
}

export function* userLogoutWatcher() {
  yield takeEvery(LOAD_LOGOUT, handleUserLogoutWorker);
}

// Forgot Password
function* handleUserForgorPasswordWorker() {
  const {
    SignUpOrLogin: { values },
  } = yield select(getFormValues);

  if (values) {
    try {
      const { data } = yield call(forgotPassword, values.forgotemail);

      if (data) {
        yield call(
          globalSuccessMessageHandler,
          `Reset link sent to ${values.forgotemail}`
        );
      }
    } catch (error) {
      // yield console.clear();
      yield call(
        globalErrorMessageHandler,
        `Something went wrong try again later!!!`
      );
    }
  } else {
    yield call(globalErrorMessageHandler, "Enter Email to get reset link!! 😇");
  }
}

export function* userForgotPasswordWatcher() {
  yield takeEvery(LOAD_FORGOT_PASSWORD, handleUserForgorPasswordWorker);
}

// Password reset

function* handleUserPasswordResetWorker() {
  const {
    resetForm: { values },
  } = yield select(getFormValues);
  const resetToken = yield history.location.pathname.split("user_auth/")[1];
  if (values) {
    if (!values.password) {
      yield call(globalErrorMessageHandler, "Enter Password");
      return;
    }

    if (!values.confirmPassword) {
      yield call(globalErrorMessageHandler, "Confirm Your Password");
      return;
    }

    if (values.password !== values.confirmPassword) {
      yield call(globalErrorMessageHandler, "Password didn't match 😬");
      return;
    }
    try {
      const { data } = yield call(
        resetPassword,
        resetToken,
        values.password,
        values.confirmPassword
      );

      yield call(globalSuccessMessageHandler, data.message);
      yield call(setSessionItem, AUTH_TOKEN, data.token);
      yield history.push("/");
      yield call(handleUserAccreditationWorker);
    } catch (err) {
      // yield console.clear();
      try {
        if (err.response.data.message) {
          yield call(globalErrorMessageHandler, err.response.data.message);
        }
      } catch (e) {
        yield call(
          globalErrorMessageHandler,
          "Reset Token Expired 😒, Please request for new reset link!!!"
        );
      }
    }
  } else {
    yield call(
      globalErrorMessageHandler,
      "Enter Password and Confirm Password"
    );
  }
}

export function* userResetPasswordWatcher() {
  yield takeLatest(LOAD_RESET_PASSWORD, handleUserPasswordResetWorker);
}

// Manage User data

const getUserDataFromStore = ({ userDetails }) => userDetails;

function* handleUserManageDataWorker() {
  const userData = yield select(getUserDataFromStore);
  if (userData.hasOwnProperty("user")) {
    return;
  }

  const auth_cookie = getCookie(AUTH_TOKEN);
  const auth_session = getSessionItem(AUTH_TOKEN);

  if (!auth_cookie && !auth_session) {
    history.goBack();
    return;
  }

  try {
    // If user details already in store don't call the api!!
    // If No auth-token don't call api

    const { data } = yield call(getUserApi);
    yield put(getUser(data.user));
  } catch (err) {
    // yield console.clear();
    yield call(globalErrorMessageHandler, "Something went wrong🤯!!!");
  }
}

export function* userManagaDataWatcher() {
  yield takeLatest(LOAD_USER, handleUserManageDataWorker);
}

// User Update

const getUserUpdateValueFromStore = ({ updateUserDetail }) => updateUserDetail;

function* handleUserPasswordUpdateWorker() {
  const { fields } = yield select(getUserUpdateValueFromStore);
  if (fields) {
    if (!fields.currentPassword) {
      yield call(globalErrorMessageHandler, "Enter Current Password🤯!!!");
      return;
    }
    if (!fields.password) {
      yield call(globalErrorMessageHandler, "Enter New Password🤯!!!");
      return;
    }
    if (!fields.confirmPassword) {
      yield call(globalErrorMessageHandler, "Enter Confirm password🤯!!!");
      return;
    }
    if (fields.currentPassword === fields.password) {
      yield call(
        globalErrorMessageHandler,
        "Current Password and New Password Cannot be Same🤯!!!"
      );
      return;
    }

    // Call API
    try {
      const { data } = yield call(
        updateUserPassword,
        fields.currentPassword,
        fields.password,
        fields.confirmPassword
      );

      yield call(globalSuccessMessageHandler, data.message);
    } catch (err) {
      // yield console.clear();
      try {
        if (err.response) {
          yield call(globalErrorMessageHandler, err.response.data.message);
        }
      } catch (error) {
        yield call(globalErrorMessageHandler, "Something went wrong🤯");
      }
    }
  }
}

export function* userUpdateWatcher() {
  yield takeLatest(USER_PASSWORD_CHANGE, handleUserPasswordUpdateWorker);
}
