import { LOADERS } from "../constants";

const {
  CATEGORY_LOADING,
  PRODUCTS_LISTS_LOADING,
  REVIEW_LOADING,
  AUTH_LOADING,
  CHECKOUT_LOADING,
} = LOADERS;

const loaderReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LOADING:
      return { ...state, categoryLoading: action.state };

    case PRODUCTS_LISTS_LOADING:
      return { ...state, productsLoading: action.state };
    case REVIEW_LOADING:
      return { ...state, reviewLoading: action.state };
    case AUTH_LOADING:
      return { ...state, authLoading: action.state };
    case CHECKOUT_LOADING:
      return { ...state, checkoutLoading: action.state };
    default:
      return state;
  }
};

export default loaderReducer;
