import { Router } from "express";
import multer from "multer";

import {
  addProductMobileReview,
  addProductComputerReview,
  addProductElectronicsReview,
  addProductBeautyReview,
  addProductFashionReview,
  addProductKitchenReview,
  addProductPetReview,
  addProductFoodReview,

  // like
  getProductReviewBasedOnProductId,
  reviewHelpfulPost,

  // Middlewares
  protectRoute,
  preFillUserId,
  preFillReviewHelpulForLikeOrUndo,

  //   Image Process
  handleProductReviewImage,
  processProductReviewImage,
} from "../controller/productReviewController";

const upload = multer();

export const productReviewRouter = Router();

productReviewRouter.route("/getReviews").get(getProductReviewBasedOnProductId);

productReviewRouter
  .route("/foundHelpful/:bool")
  .post(
    protectRoute,
    preFillUserId,
    preFillReviewHelpulForLikeOrUndo,
    reviewHelpfulPost
  );

productReviewRouter.route("/addMobileReview").post(
  upload.array("productReviewImage"),
  // (req, res, next) => {
  //   console.log(req.files);
  //   res.send(req.files);
  // },
  protectRoute,
  preFillUserId,
  handleProductReviewImage,
  processProductReviewImage,
  addProductMobileReview
);

productReviewRouter.route("/addComputerReview").post(
  upload.array("productReviewImage"),
  // (req, res, next) => {
  //   res.send(req.files);
  // },
  protectRoute,
  preFillUserId,
  handleProductReviewImage,
  processProductReviewImage,
  addProductComputerReview
);

productReviewRouter
  .route("/addElectronicsReview")
  .post(
    upload.array("productReviewImage"),
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductElectronicsReview
  );

productReviewRouter
  .route("/addBeautyReview")
  .post(
    upload.array("productReviewImage"),
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductBeautyReview
  );

productReviewRouter.route("/addFashionReview").post(
  upload.array("productReviewImage"),

  protectRoute,
  preFillUserId,
  handleProductReviewImage,
  processProductReviewImage,
  addProductFashionReview
);

productReviewRouter
  .route("/addKitchenReview")
  .post(
    upload.array("productReviewImage"),
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductKitchenReview
  );

productReviewRouter
  .route("/addPetReview")
  .post(
    upload.array("productReviewImage"),
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductPetReview
  );

productReviewRouter
  .route("/addFoodReview")
  .post(
    upload.array("productReviewImage"),
    protectRoute,
    preFillUserId,
    handleProductReviewImage,
    processProductReviewImage,
    addProductFoodReview
  );
