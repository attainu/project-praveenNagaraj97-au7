import { takeLatest, call } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../constants";

import { handleProductsCategoryWorker } from "./ProductsSagas/productCategoriesSaga";

function* handleWebsiteLoadWorker() {
  yield call(handleProductsCategoryWorker);
}

export function* websiteLoadWatcher() {
  yield takeLatest(WEBSITE_LOAD, handleWebsiteLoadWorker);
}
