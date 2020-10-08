import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createEncryptor from "redux-persist-transform-encrypt";

import createReduxSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "../sagas";
import { USER_AUTH_TYPES, WEBSITE_LOAD } from "../constants";

const {
  USER_STATUS: { LOAD_ACCREDITATION },
} = USER_AUTH_TYPES;

const encryptor = createEncryptor({
  secretKey: "react-and-redux-is-fun",
  onError: function (error) {},
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [
    "userAuthorization",
    "userAccredited",
    "form",
    "userDetails",
    "productCategories",
    "updateUserDetail",
    "requests",
    "loader",
    "payment",
  ],

  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createReduxSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware];

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

store.dispatch({ type: WEBSITE_LOAD });
store.dispatch({ type: LOAD_ACCREDITATION });

if (process.env.NODE_ENV === "development") {
  window.store = store;
}

export default store;
