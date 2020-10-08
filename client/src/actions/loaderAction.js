import { LOADERS } from "../constants";

const {
  CATEGORY_LOADING,
  PRODUCTS_LISTS_LOADING,
  REVIEW_LOADING,
  AUTH_LOADING,
  CHECKOUT_LOADING,
} = LOADERS;

// Loads on website load.
export const productCategoryLoading = (state = false) => ({
  type: CATEGORY_LOADING,
  state,
});

export const productsLoading = (state = false) => ({
  type: PRODUCTS_LISTS_LOADING,
  state,
});

// Product Review
export const productReviewLoading = (state = false) => ({
  type: REVIEW_LOADING,
  state,
});

export const authLoading = (state = false) => ({
  type: AUTH_LOADING,
  state,
});

export const checkoutLoading = (state = false) => ({
  type: CHECKOUT_LOADING,
  state,
});
