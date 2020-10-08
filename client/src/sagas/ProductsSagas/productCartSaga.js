import { takeLatest, select, put, call, takeEvery } from "redux-saga/effects";
import { PRODUCT_TYPES } from "../../constants";

import { getProductsDetailsInCart, setBackReachedLimit } from "../../actions";

import {
  globalErrorMessageHandler,
  globalSuccessMessageWithImageHandler,
} from "../HandleAlertSagas";

import { getProductsDetailsForGrpIdsEndPoint } from "../../api";

const {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  LOAD_PRODUCT_CART,
} = PRODUCT_TYPES;

const getProductsListFromStore = ({ productsList }) => productsList;

// Cart

const getCartStatefromStore = ({ productCart }) => productCart;

function* handleProductAddCartWorker() {
  const { addedItem, reached } = yield select(getCartStatefromStore);
  const { products } = yield select(getProductsListFromStore);

  if (reached) {
    yield put(setBackReachedLimit(false));
    return yield call(
      globalErrorMessageHandler,
      "Product is already in cart 1 item per customer"
    );
  }

  const addedProduct = yield products.find((item) => item._id === addedItem);
  const { productCoverImage, productName } = addedProduct;
  const message = `${productName} added to cart😍`;
  yield call(globalSuccessMessageWithImageHandler, message, productCoverImage);
}

function* handleProductRemoveCartWorker() {
  // const { cart } = yield select(getCartStatefromStore);
}

// Add and remove watcher

const addQuantityPropToCart = (cartItems) => {
  const result = {};
  cartItems.forEach((item) => {
    result[item] = (result[item] || 0) + 1;
  });
  return result;
};

export function* productCartWatcher() {
  yield takeEvery(ADD_PRODUCT_TO_CART, handleProductAddCartWorker);
  yield takeEvery(REMOVE_PRODUCT_FROM_CART, handleProductRemoveCartWorker);
}

function* handleproductCartWorker() {
  const { cart } = yield select(getCartStatefromStore);
  if (cart.length < 1) return put(getProductsDetailsInCart([]));

  const qunatityOfCartItems = yield addQuantityPropToCart(cart);
  try {
    const { data } = yield call(getProductsDetailsForGrpIdsEndPoint, {
      cartItems: cart,
    });

    let subTotal = 0;

    data.details.map((item) => {
      item.quantity = qunatityOfCartItems[item._id];

      item.price = item.productPrice * item.quantity;
      subTotal += item.price;
      return item;
    });

    const cartData = {
      details: data.details,
      subTotal,
    };

    yield put(getProductsDetailsInCart(cartData));
  } catch (err) {
    // yield console.clear();
    yield call(
      globalErrorMessageHandler,
      "Something went wrong try again later!"
    );
  }
}

export function* productCartLoadWatcher() {
  yield takeLatest(LOAD_PRODUCT_CART, handleproductCartWorker);
}
