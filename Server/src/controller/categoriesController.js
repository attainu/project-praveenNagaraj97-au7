import Category from "../model/categoryModel";
import { GCS_BUCKET_NAME } from "../constants";

import {
  createNewDocumnet,
  readAllDocument,
  updateDocumentByID,
  deleteDocumentById,
} from "../handlers/factoryHandler";
import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";
import { deleteCategoryCoverImageFromGCloud } from "../middleware/productPreFillers";

export { protectRoute, restrictTo } from "./userController";

const { LEXA_PRODUCT_CATEGORIES } = GCS_BUCKET_NAME;

export { preCheckCategoryInputs } from "../middleware/preChecks";
export const getCatgoryImageProcessed = handleImageUpload(
  1,
  LEXA_PRODUCT_CATEGORIES,
  false,
  false
);
export const categoryImageLink = processSingleImage("categoryIcon", false);
export const createNewCategory = createNewDocumnet(Category, {
  message: "New Category Added Successfully",
});

export const getAllCategories = readAllDocument(Category, {
  message: "List Of Categories",
});

export const deletePrevImageFromGCloud = deleteCategoryCoverImageFromGCloud(
  Category,
  LEXA_PRODUCT_CATEGORIES
);
export const updateCategory = updateDocumentByID(Category, {
  message: "Category Update Successfully",
});

export const deleteCategory = deleteDocumentById(Category, {
  message: "Category Deleted",
});
