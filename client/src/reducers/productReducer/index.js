import { PRODUCT_TYPES, PAYMENT_TYPES } from "../../constants";

export {
  productReviewReducer,
  addNewProductReviewReducer,
} from "./productReviewReducer";
export { categoriesReducer } from "./productCategoriesReducer";

const {
  LOAD_GET_PRODUCTS_BASED_ON_QUERY,
  GET_PRODUCTS_BASED_ON_QUERY,
  HOLD_PREVIOUS_REQUESTED_QUERY,
  SET_NUMBER_OF_RESULTS_PERPAGE,
  SET_PAGE_NUMBER,
  NO_MORE_RESULTS_FOUND,

  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  GET_PRODUCTS_IN_CART,
  SET_BACK_REACHED_LIMIT,

  LOAD_VIEW_PRODUCT_DETAIL,
  PRODUCT_DETAIL,

  SORT_PRODUCTS_ASCE,
  SORT_PRODUCTS_DESC,
  SORT_BY_FEATURED,
} = PRODUCT_TYPES;

const { ORDER_SUCCESS } = PAYMENT_TYPES;

const getProductsrelatedToQuery = {
  products: [],
  query: { pageNumber: 1, limit: 8 },
};

export const getProductsReducer = (
  state = getProductsrelatedToQuery,
  action
) => {
  switch (action.type) {
    case LOAD_GET_PRODUCTS_BASED_ON_QUERY:
      state.query["current"] = action.query;
      return { ...state };

    case HOLD_PREVIOUS_REQUESTED_QUERY:
      state.query["prev"] = action.prevQuery;
      return { ...state };

    case GET_PRODUCTS_BASED_ON_QUERY:
      return { ...state, products: action.response };

    case SORT_PRODUCTS_ASCE:
      if (!state.hasOwnProperty("featured")) {
        state["featured"] = state.products;
      }
      state["products"] = [...state.products].sort(
        (a, b) => a.productPrice - b.productPrice
      );

      return { ...state };

    case SORT_PRODUCTS_DESC:
      if (!state.hasOwnProperty("featured")) {
        state["featured"] = state.products;
      }
      state["products"] = [...state.products].sort(
        (a, b) => b.productPrice - a.productPrice
      );
      return { ...state };

    case SORT_BY_FEATURED:
      if (state.hasOwnProperty("featured")) {
        state["products"] = state.featured;
      }
      return { ...state };

    case SET_PAGE_NUMBER:
      state.query["pageNumber"] = action.pageNumber;
      return { ...state };

    case SET_NUMBER_OF_RESULTS_PERPAGE:
      state.query["limit"] = action.noOfResults;
      return { ...state };

    case NO_MORE_RESULTS_FOUND:
      state.query["moreResultsAvailable"] = action.isAvailable;
      return { ...state };
    default:
      return state;
  }
};

export const productCartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      if (state.cart.includes(action.item)) {
        state["reached"] = true;
        return { ...state };
      }

      if (state.cart.filter((each) => each === action.item).length >= 1) {
        return { ...state };
      }
      state["addedItem"] = action.item;
      state.cart.push(action.item);
      return { ...state };

    case SET_BACK_REACHED_LIMIT:
      state["reached"] = action.bool;
      return { ...state };

    case ORDER_SUCCESS:
      state.cart = [];
      state.productsInCart = [];
      state.addedItem = null;
      state.subTotal = null;
      return { ...state };

    case REMOVE_PRODUCT_FROM_CART:
      state.cart.splice(
        state.cart.findIndex((item) => item === action.item),
        1
      );
      if (state.cart.length === 0) delete state["productsInCart"];
      return { ...state };

    case GET_PRODUCTS_IN_CART:
      state["productsInCart"] = action.details.details;
      state["subTotal"] = action.details.subTotal;
      return { ...state };

    default:
      return state;
  }
};

export const viewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_VIEW_PRODUCT_DETAIL:
      state["productType"] = {
        productCategory: action.productDetail.category,
        productId: action.productDetail.id,
      };
      return { ...state };

    case PRODUCT_DETAIL:
      // What if no images were found ?
      // Assign images when data contains object!!
      // as it is virtual field data will be inside array so take the first item

      //what if productImagesAndDesc has only description but no images?

      // No worries server is designed to have set of 5 images description !!
      // what type of description does send?
      // server send different type of description for different category !

      state["images"] =
        action.data.productImagesAndDesc.length > 0
          ? action.data.productImagesAndDesc[0].productImages
          : [];

      state["productBrief"] =
        action.data.productImagesAndDesc.length > 0
          ? action.data.productImagesAndDesc[0].productDescription
          : null;

      state["quantity"] = action.data.quantity;

      state["productInfo"] =
        action.data.productFullDetails.length > 0
          ? {
              productName: action.data.productName,
              productPrice: action.data.productPrice,
              featuresList: action.data.productFullDetails[0].featuresList,
              similarProducts: action.data.productFullDetails[0].productId,
            }
          : null;

      state["productVideo"] =
        action.data.productFullDetails.length > 0
          ? action.data.productFullDetails[0].productVideo
          : null;

      state["productDetails"] =
        action.data.productFullDetails.length > 0
          ? action.data.productFullDetails[0].productDetails
          : null;

      state["manufacturer"] =
        action.data.productFullDetails.length > 0
          ? action.data.productFullDetails[0].manufacturerId
          : null;

      state["productBoards"] =
        action.data.productBoards.length > 0
          ? action.data.productBoards[0].boardImages
          : null;
      state["similarProducts"] = action.data.similarProducts;

      return { ...state };
    default:
      return state;
  }
};
