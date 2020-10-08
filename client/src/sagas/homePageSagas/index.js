import { select, takeEvery, put } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";

import { recentlyViewedItems } from "../../actions";

const { LOAD_VIEW_PRODUCT_DETAIL } = PRODUCT_TYPES;

const getRecentelyViewingItem = ({ productDetail }) => productDetail;
const getProductsList = ({ productsList }) => productsList;

const getCurrentViewedItems = ({ landing: { viewedItems } }) => viewedItems;

export function* handleRecentSearchWorker() {
  const {
    productType: { productId },
  } = yield select(getRecentelyViewingItem);
  const { products } = yield select(getProductsList);

  const viewedItems = yield select(getCurrentViewedItems);
  const viewedProduct = yield products.filter(({ _id }) => _id === productId);

  if (!viewedItems) {
    yield put(recentlyViewedItems(viewedProduct));
  } else {
    if (viewedItems.find(({ _id }) => productId === _id)) return;

    const modelNewViewedList = [...viewedProduct, ...viewedItems];

    if (modelNewViewedList.length === 10) {
      modelNewViewedList.pop();
    }

    yield put(recentlyViewedItems(modelNewViewedList));
  }
}

export function* loadRecentSearchWatcher() {
  yield takeEvery(LOAD_VIEW_PRODUCT_DETAIL, handleRecentSearchWorker);
}
