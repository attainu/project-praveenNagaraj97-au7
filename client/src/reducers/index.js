import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import globalMessageReducer from "./globalMessageReducer";
import userAuthLoginReducer, {
  userAccredited,
  userDetailsReducer,
  userDetailsUpdateReducer,
} from "./userAuthReducer";
import {
  getProductsReducer,
  productCartReducer,
  viewProductReducer,
  productReviewReducer,
  addNewProductReviewReducer,
  categoriesReducer,
} from "./productReducer";

import requestReducer from "./_requestsReduers";
import landingPageReducer from "./landingPageReducer";
import loaderReducer from "./loadersReducer";
import paymentReducer from "./paymentReducer";

export default combineReducers({
  loader: loaderReducer,
  userAccredited,
  userAuthorization: userAuthLoginReducer,
  globalErrorOrSuccessMessage: globalMessageReducer,
  updateUserDetail: userDetailsUpdateReducer,
  form: formReducer,
  payment: paymentReducer,
  productCategories: categoriesReducer,
  productsList: getProductsReducer,
  userDetails: userDetailsReducer,
  productCart: productCartReducer,
  productDetail: viewProductReducer,
  productReview: productReviewReducer,
  addNewProduct: addNewProductReviewReducer,
  landing: landingPageReducer,
  requests: requestReducer,
});
