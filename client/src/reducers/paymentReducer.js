import { PAYMENT_TYPES } from "../constants";

const { CHECKOUT_SUCCESS, ORDER_SUCCESS, ORDER_FAILED } = PAYMENT_TYPES;

const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
      return { ...state, payment_intent: action.intent };

    case ORDER_SUCCESS:
      return { ...state, orderedDetails: action.details };

    case ORDER_FAILED:
      return { ...state, orderedFailedReason: action.details };

    default:
      return state;
  }
};

export default paymentReducer;
