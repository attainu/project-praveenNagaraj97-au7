import { Router } from "express";
import multer from "multer";

import {
  addDetailForProduct,
  updateProductDetailVideo,

  // Middleware
  preFillProductdetailedDescription,
  preCheckifProductUpdateDetailVideoHasFileAttached,
  checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo,

  // Video Process,
  handleProductDetailVideo,
  processProductDetailVideo,

  // Protect
  protectRoute,
  restrictTo,
} from "../controller/productDetailController";

export const productDetailRouter = Router();
const upload = multer();

productDetailRouter
  .route("/addDetail/detail")
  .post(
    upload.array("productVideo"),
    protectRoute,
    restrictTo("manufacturer"),
    preFillProductdetailedDescription,
    handleProductDetailVideo,
    processProductDetailVideo,
    addDetailForProduct
  );

productDetailRouter
  .route("/updateProductDetailVideo")
  .patch(
    preCheckifProductUpdateDetailVideoHasFileAttached,
    checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo,
    handleProductDetailVideo,
    processProductDetailVideo,
    updateProductDetailVideo
  );
