import { GCS_BUCKET_NAME } from "../constants";

import {
  Product,
  ProductDescriptionAndImages,
  ProductBoards,
} from "../model/productModel";

import {
  createNewDocumnet,
  readAllDocument,
  readDocumentByIdThroughQuery,
} from "../handlers/factoryHandler";
import {
  processSingleImage,
  handleImageUpload,
  processMultipleImages,
  handleImageUploadWithNoImageLimit,
} from "../middleware/imageProcessMiddleware";

export {
  preFillCartIdasParams,
  preFillProductBoards,
  getAllProductsWithAverageReviewAttached,
  preFillManufacturerId,
} from "../middleware/productPreFillers";

const {
  LEXA_PRODUCT_COVERS,
  PRODUCT_DETAILS_IMAGES,
  PRODUCT_BOARDS,
} = GCS_BUCKET_NAME;

// Protect Middlewares
export { protectRoute, restrictTo } from "./userController";

export const getProductImageProcessed = handleImageUpload(
  1,
  LEXA_PRODUCT_COVERS,
  false,
  false
);
export const productImageLink = processSingleImage("productCoverImage", false);
export const addNewProduct = createNewDocumnet(Product, {
  message: "New Product Added Successfully",
});

export const getAllProducts = readAllDocument(Product, {
  message: "List Of Products",
  next: true,
});

// Cart
export const getProductDetailsWithProductIds = readAllDocument(Product, {
  message: "Details Of Products in Cart",
});

// Product Description
export const handleProductImages = handleImageUpload(
  5,
  PRODUCT_DETAILS_IMAGES,
  false,
  false
);
export const processProductImages = processMultipleImages("productImages");

export const addProductDescriptionAndImages = createNewDocumnet(
  ProductDescriptionAndImages,
  {
    message: "Product Description and Images added",
  }
);

export const getProduct = readDocumentByIdThroughQuery(Product, {
  message: "Requested Product",
});

// Product Boards
export const handleProductBoardImages = handleImageUploadWithNoImageLimit(
  PRODUCT_BOARDS
);

export const processProductBoards = processMultipleImages("boardImages");
export const addProductBoards = createNewDocumnet(ProductBoards, {
  message: "Product Boards Added",
});
