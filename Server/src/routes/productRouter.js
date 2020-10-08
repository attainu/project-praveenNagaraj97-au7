import { Router } from "express";
import multer from "multer";

import {
  // Image Process
  getProductImageProcessed,
  productImageLink,
  handleProductImages,
  processProductImages,
  handleProductBoardImages,
  processProductBoards,
  getAllProductsWithAverageReviewAttached,

  // Routes
  addNewProduct,
  getAllProducts,
  getProductDetailsWithProductIds,
  getProduct,
  addProductDescriptionAndImages,
  addProductBoards,

  // Middlewares
  preFillCartIdasParams,
  preFillProductBoards,
  preFillManufacturerId,
  // Protect
  protectRoute,
  restrictTo,
} from "../controller/productsController";

export const productRouter = Router();
const upload = multer();

// Public Routes

productRouter
  .route("/getProducts")
  .get(getAllProducts, getAllProductsWithAverageReviewAttached);

productRouter
  .route("/getProductDetailsWithProductIds")
  .post(preFillCartIdasParams, getProductDetailsWithProductIds);

productRouter.route("/getProduct").get(getProduct);

// Seller Route

// DevRoute
productRouter
  .route("/dev/addNewProduct")
  .post(
    upload.array("productCoverImage"),
    protectRoute,
    restrictTo("manufacturer"),
    preFillManufacturerId,
    getProductImageProcessed,
    productImageLink,
    addNewProduct
  );

productRouter
  .route("/dev/addProductDescAndImages")
  .post(
    upload.array("productImages"),
    handleProductImages,
    processProductImages,
    addProductDescriptionAndImages
  );

productRouter
  .route("/dev/addProductBoards")
  .post(
    upload.array("productBoards"),
    preFillProductBoards,
    handleProductBoardImages,
    processProductBoards,
    addProductBoards
  );
