import { takeLatest, select, call, put } from "redux-saga/effects";

import { PRODUCT_TYPES } from "../../constants";
import { getProductsBasedOnQuery } from "../../api";

import {
  getProductsOnQuery,
  holdPreviousProductQuery,
  noMoreResultsFound,
  setPageNumber,
  productsLoading,
} from "../../actions";

import { globalErrorMessageHandler } from "../HandleAlertSagas";

const { LOAD_GET_PRODUCTS_BASED_ON_QUERY, SET_PAGE_NUMBER } = PRODUCT_TYPES;

const getProductsListFromStore = ({ productsList }) => productsList;

// This worker runs on first load only!!!
function* handleLoadProductWorker() {
  const { query } = yield select(getProductsListFromStore);

  if (
    query.prev !==
    query.current + `&page=${query.pageNumber}&limit=${query.limit}`
  ) {
    try {
      yield put(productsLoading(true));
      yield put(setPageNumber(1));
      yield put(getProductsOnQuery([]));

      yield put(
        holdPreviousProductQuery(
          query.current + `&page=${query.pageNumber}&limit=${query.limit}`
        )
      );

      const { data } = yield call(
        getProductsBasedOnQuery,
        query.current + `&page=${query.pageNumber}&limit=${query.limit}`
      );

      data.details.length === query.limit
        ? yield put(noMoreResultsFound(true))
        : yield put(noMoreResultsFound(false));
      yield put(productsLoading(false));
      yield put(getProductsOnQuery(data.details));
    } catch (err) {
      yield console.clear();
      if (err.response.data.message === "No Document Found") {
        yield put(productsLoading(false));
        yield put(getProductsOnQuery([]));
        yield put(noMoreResultsFound(false));
        return;
      }

      yield put(productsLoading(false));
      yield call(
        globalErrorMessageHandler,
        "Something went wrong Please try again later!"
      );
    }
  }
}

export function* loadProductsWatcher() {
  yield takeLatest(LOAD_GET_PRODUCTS_BASED_ON_QUERY, handleLoadProductWorker);
}

// This workers runs on page Increment only excluding page number at 1!
function* handleLoadMoreResultsWorker() {
  const { query, products } = yield select(getProductsListFromStore);

  if (query.pageNumber !== 1) {
    try {
      yield put(
        holdPreviousProductQuery(
          query.current + `&page=${query.pageNumber}&limit=${query.limit}`
        )
      );
      const { data } = yield call(
        getProductsBasedOnQuery,
        query.current + `&page=${query.pageNumber}&limit=${query.limit}`
      );
      if (data.message === "No Document Found") {
        yield put(noMoreResultsFound(false));
        return;
      }

      data.details.length === query.limit
        ? yield put(noMoreResultsFound(true))
        : yield put(noMoreResultsFound(false));

      yield put(getProductsOnQuery([...products, ...data.details]));
    } catch (err) {
      yield console.clear();
      try {
        yield put(noMoreResultsFound(false));
        // yield call(globalErrorMessageHandler, err.response.data.message);
      } catch (err) {
        yield call(
          globalErrorMessageHandler,
          "Something went wrong Please try again later!"
        );
      }
    }
  }
}

export function* loadMoreResultsWatcher() {
  yield takeLatest(SET_PAGE_NUMBER, handleLoadMoreResultsWorker);
}
