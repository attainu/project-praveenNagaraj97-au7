import { PRODUCT_TYPES } from "../../constants";

const {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  GET_PRODUCTS_IN_CART,
  LOAD_PRODUCT_CART,
  SET_BACK_REACHED_LIMIT,
} = PRODUCT_TYPES;

// Cart Actions
export const addItemToCart = (item) => ({
  type: ADD_PRODUCT_TO_CART,
  item,
});

export const removeItemFromCart = (item) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  item,
});

export const loadProductCart = () => ({ type: LOAD_PRODUCT_CART });

export const getProductsDetailsInCart = (details) => ({
  type: GET_PRODUCTS_IN_CART,
  details,
});

export const setBackReachedLimit = (bool) => ({
  type: SET_BACK_REACHED_LIMIT,
  bool,
});
