import { call, put } from "redux-saga/effects";

import { WEBSITE_LOAD } from "../../constants";
import { getAllCategoriesEndpoint } from "../../api";

import { globalErrorMessageHandler } from "../HandleAlertSagas";
import { productCategoryLoading, getAllCategories } from "../../actions";

export function* handleProductsCategoryWorker() {
  try {
    yield put(productCategoryLoading(true));
    const { data } = yield call(getAllCategoriesEndpoint);
    yield put(productCategoryLoading(false));
    yield put(getAllCategories(data.details));
  } catch (err) {
    yield put(productCategoryLoading(false));
    // yield console.clear();
    yield call(
      globalErrorMessageHandler,
      "Something went Wrong Server didn't respond!! Trying again"
    );
    yield put({ type: WEBSITE_LOAD });
  }
}
