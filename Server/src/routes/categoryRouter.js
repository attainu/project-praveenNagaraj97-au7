import { Router } from "express";
import multer from "multer";

import {
  // create
  preCheckCategoryInputs,
  getCatgoryImageProcessed,
  categoryImageLink,
  createNewCategory,

  // Fetch all categories
  getAllCategories,
  updateCategory,
  deleteCategory,

  // CASCADE
  deletePrevImageFromGCloud,

  // Protect
  protectRoute,
  restrictTo,
} from "../controller/categoriesController";

export const categoryRouter = Router();

const upload = multer();

// Public Routes
categoryRouter.route("/getAllCategories").get(getAllCategories);

// Developers Only Routes..
categoryRouter
  .route("/dev/addNewCategory")
  .post(
    upload.array("categoryImage"),
    protectRoute,
    restrictTo("dev"),
    preCheckCategoryInputs,
    getCatgoryImageProcessed,
    categoryImageLink,
    createNewCategory
  );

categoryRouter
  .route("/dev/:id/updateCategory")
  .patch(
    upload.array("categoryImage"),
    protectRoute,
    restrictTo("dev"),
    deletePrevImageFromGCloud,
    getCatgoryImageProcessed,
    categoryImageLink,
    updateCategory
  );

categoryRouter
  .route("/dev/:id/deleteCategory")
  .delete(protectRoute, restrictTo("dev"), deleteCategory);
