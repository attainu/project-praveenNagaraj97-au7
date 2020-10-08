import Axios from "axios";

/**
 * @param{G-App-Engine} : "https://lexa-api.uc.r.appspot.com/api/v1"
 * @param Heroku-Engine : "https://lexa-api-v1.herokuapp.com/api/v1"
 */

export const apiBaseEndpoint = Axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://lexa-api.uc.r.appspot.com/api/v1`
      : `http://localhost:8080/api/v1`,
});

export {
  loginEndPoint as UserLogger,
  signUpEndPoint as UserSigner,
  authAccreditationEndPoint as AuthAccreditation,
  forgotPasswordEndpoint as forgotPassword,
  resetPasswordEndpoint as resetPassword,
  getUserEndpoint as getUser,
  updateUserPasswordEndpoint as updateUserPassword,
} from "./userAuthAPI";

export {
  getAllCategoriesEndpoint,
  getProductsBasedOnQuery,
  getProductsDetailsForGrpIdsEndPoint,
  getProductDetailEndPoint,
  getListOfProductReviewsEndPoint,
  reviewFoundHelpfulEndpoint,
  getLatestProductsOnStore,
} from "./productEndpoints";

export {
  addMobileReview,
  addComputerReview,
  addElectronicsReview,
  addBeautyReview,
  addFashionReview,
  addKitchenReview,
  addPetReview,
  addFoodReview,
  getTopLevelAdvertiseEndpoint,
  buyProductsSessionEndpoint,
  buyProductsViaPaymentIntentEndpoint,
  getUserOrdersEndpoint,
  retrievePaymentIntent,
} from "./addon";
