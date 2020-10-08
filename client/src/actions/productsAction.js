import { PRODUCT_TYPES, RE_OCCURING_REQUESTS } from "../constants";

const {
  GET_ALL_CATEGORIES,
  LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  GET_PRODUCTS_BASED_ON_QUERY,
  HOLD_PREVIOUS_REQUESTED_QUERY,
  SET_NUMBER_OF_RESULTS_PERPAGE,
  SET_PAGE_NUMBER,
  NO_MORE_RESULTS_FOUND,
  LOAD_VIEW_PRODUCT_DETAIL,
  PRODUCT_DETAIL,

  SORT_PRODUCTS_ASCE,
  SORT_PRODUCTS_DESC,
  SORT_BY_FEATURED,
} = PRODUCT_TYPES;

const { RE_OCCURING_PRODUCT_DETAIL } = RE_OCCURING_REQUESTS;

export {
  getProductReviews,
  loadNewProductReview,
  loadProductReview,
  reviewFoundHelpful,
} from "./review";
export {
  addItemToCart,
  getProductsDetailsInCart,
  loadProductCart,
  removeItemFromCart,
  setBackReachedLimit,
} from "./cart";

export const reOccuringProductDetailRequests = (request) => ({
  type: RE_OCCURING_PRODUCT_DETAIL,
  request,
});

export const getAllCategories = (response) => ({
  type: GET_ALL_CATEGORIES,
  response,
});

// loads when a query is requested to server for products

export const loadGetProductsOnQuery = (query) => ({
  type: LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  query,
});
// Holds the previous query to avoid refetch!
export const holdPreviousProductQuery = (prevQuery) => ({
  type: HOLD_PREVIOUS_REQUESTED_QUERY,
  prevQuery,
});

// takes products as array and stores them in redux-store

export const getProductsOnQuery = (response) => ({
  type: GET_PRODUCTS_BASED_ON_QUERY,
  response,
});

// Scrolling effect or next page
export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  pageNumber,
});
// limit the each request response results count !!!
export const setLimitsPerPage = (noOfResults) => ({
  type: SET_NUMBER_OF_RESULTS_PERPAGE,
  noOfResults,
});
// If server responds with no documents/nodata sets this to false
export const noMoreResultsFound = (isAvailable) => ({
  type: NO_MORE_RESULTS_FOUND,
  isAvailable,
});

export const loadViewProductDetail = (
  productDetail = { category: null, id: null }
) => ({
  type: LOAD_VIEW_PRODUCT_DETAIL,
  productDetail,
});

export const getProductDetail = (data) => ({ type: PRODUCT_DETAIL, data });

export const sortProductListASCE = () => ({ type: SORT_PRODUCTS_ASCE });
export const sortProductListDESC = () => ({ type: SORT_PRODUCTS_DESC });
export const sortProductListFEATURED = () => ({ type: SORT_BY_FEATURED });
