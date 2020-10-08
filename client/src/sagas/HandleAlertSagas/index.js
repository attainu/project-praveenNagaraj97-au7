import { delay, put } from "redux-saga/effects";

import {
  globalFailureMessenger,
  globalSuccesMessenger,
  globalSuccesMessengerWithImg,
} from "../../actions";
import { ALERT_DURATION } from "../../constants";

export function* globalErrorMessageHandler(errorMesssage) {
  yield put(globalFailureMessenger(errorMesssage));
  yield delay(ALERT_DURATION);
  yield put(globalFailureMessenger(null));
}

export function* globalSuccessMessageHandler(successMessage) {
  yield put(globalSuccesMessenger(successMessage));
  yield delay(ALERT_DURATION);
  yield put(globalSuccesMessenger(null));
}

export function* globalSuccessMessageWithImageHandler(successMessage, image) {
  yield put(globalSuccesMessengerWithImg(successMessage, image));
  yield delay(ALERT_DURATION);
  yield put(globalSuccesMessengerWithImg(null, null));
}
