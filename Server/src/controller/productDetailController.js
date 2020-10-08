import { ProductDetailModel } from "../model/ProductDetailModel";
import { GCS_BUCKET_NAME } from "../constants";

import {
  createNewDocumnet,
  updateDocumentByField,
} from "../handlers/factoryHandler";
import {
  // Video Processor
  handleVideoUpload,
  processSingleVideo,
} from "../middleware/imageProcessMiddleware";

export { protectRoute, restrictTo } from "./userController";

import { preCheckIfPreviousVideoExistsAndDelete } from "../middleware/preChecks";

// This Controller doesn't have ay get Endpoints
// as this gets called along with get Products endpoint as a virtual Prop
const { PRODUCT_DETAILS_VIDEOS } = GCS_BUCKET_NAME;

export const handleProductDetailVideo = handleVideoUpload(
  1,
  PRODUCT_DETAILS_VIDEOS,
  false,
  true
);
export const processProductDetailVideo = processSingleVideo(
  "productVideo",
  true
);
export { preFillProductdetailedDescription } from "../middleware/productPreFillers";
export const addDetailForProduct = createNewDocumnet(ProductDetailModel, {
  message: "Product Detail Added",
});

// Edit Option are limited to certain fields !! to restrict product details being spammed!!!
export { preCheckifProductUpdateDetailVideoHasFileAttached } from "../middleware/preChecks";
export const checkIfVideoExistsAndDeleteBeforeUpdatingNewVideo = preCheckIfPreviousVideoExistsAndDelete(
  ProductDetailModel,
  PRODUCT_DETAILS_VIDEOS,
  "productVideo"
);
export const updateProductDetailVideo = updateDocumentByField(
  ProductDetailModel,
  {
    message: "Product Detail Video Updated",
  }
);
