export {
  // Login
  loadLogin,
  loginUser,
  // signUp
  loadSignUp,
  signUpUser,
  // accreditation
  loadAccreditation,
  userAccredited,
  // LogoutUser
  loadLogout,
  // forgot password
  loadForgotPassword,
  loadResetPassword,
  // User settings
  loadUser,
  getUser,
  userPasswordUpdate,
} from "./userAuthActions";

export {
  // Get all categories on website load
  getAllCategories,
  // Load products related to categories clicked
  loadGetProductsOnQuery,
  holdPreviousProductQuery,
  getProductsOnQuery,
  setLimitsPerPage,
  setPageNumber,
  noMoreResultsFound,
  // cart
  addItemToCart,
  removeItemFromCart,
  loadProductCart,
  getProductsDetailsInCart,
  setBackReachedLimit,
  // View Products
  loadViewProductDetail,
  getProductDetail,
  // Re Occuring request to avoid api over fetch!
  reOccuringProductDetailRequests,
  // Reviews

  loadProductReview,
  getProductReviews,
  reviewFoundHelpful,
  // Post reviews
  loadNewProductReview,
  // Sort
  sortProductListASCE,
  sortProductListDESC,
  sortProductListFEATURED,
} from "./productsAction";

export {
  globalFailureMessenger,
  globalSuccesMessenger,
  globalSuccesMessengerWithImg,
  isLoading,
  websiteLoad,
} from "./addon";

export { recentlyViewedItems } from "./home";

export {
  productCategoryLoading,
  productsLoading,
  productReviewLoading,
  authLoading,
  checkoutLoading,
} from "./loaderAction";

export {
  loadCheckout,
  checkoutSuccess,
  orderSuccess,
  orderFailed,
} from "./payment";
