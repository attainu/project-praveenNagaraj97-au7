import { PAYMENT_TYPES } from "../../constants";

const { ORDER_SUCCESS, CHECKOUT_SUCCESS, LOAD_CHECKOUT } = PAYMENT_TYPES;

export const loadCheckout = () => ({ type: LOAD_CHECKOUT });

export const checkoutSuccess = (intent) => ({
  type: CHECKOUT_SUCCESS,
  intent,
});

export const orderSuccess = (details) => ({
  type: ORDER_SUCCESS,
  details,
});

export const orderFailed = (details) => ({
  type: ORDER_SUCCESS,
  details,
});
