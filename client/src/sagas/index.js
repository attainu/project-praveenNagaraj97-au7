import { fork, all } from "redux-saga/effects";

import {
  userLoginWatcher,
  userSignUpWatcher,
  userAccreditationWatcher,
  userLogoutWatcher,
  userForgotPasswordWatcher,
  userResetPasswordWatcher,
  userManagaDataWatcher,
  userUpdateWatcher,
} from "./userAuthSagas";

import { websiteLoadWatcher } from "./websiteLoadSaga";

import {
  loadProductsWatcher,
  loadMoreResultsWatcher,
  productCartWatcher,
  productCartLoadWatcher,
  loadProductViewWatcher,
  loadProductReviewWatcher,
  reviewFoundHelfulWatcher,
  addNewProductReviewWatcher,
} from "./ProductsSagas";

import { loadRecentSearchWatcher } from "./homePageSagas";

import { loadProductsCheckoutWatcher } from "./paymentSagas";

function* rootSaga() {
  yield all([
    // website init watch
    yield fork(websiteLoadWatcher),

    // User watch
    yield fork(userLoginWatcher),
    yield fork(userSignUpWatcher),
    yield fork(userAccreditationWatcher),
    yield fork(userLogoutWatcher),
    yield fork(userForgotPasswordWatcher),
    yield fork(userResetPasswordWatcher),
    yield fork(userManagaDataWatcher),
    yield fork(userUpdateWatcher),

    // Product watch
    yield fork(loadProductsWatcher),
    yield fork(loadMoreResultsWatcher),
    yield fork(productCartWatcher),
    yield fork(productCartLoadWatcher),
    yield fork(loadProductViewWatcher),
    yield fork(loadProductReviewWatcher),
    yield fork(reviewFoundHelfulWatcher),
    yield fork(addNewProductReviewWatcher),

    // checkout
    yield fork(loadProductsCheckoutWatcher),

    // Home Page
    yield fork(loadRecentSearchWatcher),
  ]);
}

export default rootSaga;
