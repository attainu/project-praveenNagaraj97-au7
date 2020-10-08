import Mongoose from "mongoose";

import {
  BaseProductReviewModel,
  ReviewHelpful,
} from "../model/productReviewModel";

import {
  MobileReviewModel,
  ComputerReviewModel,
  ElectronicsReviewModel,
  BeautyReviewModel,
  FashionReviewModel,
  KitchenReviewModel,
  PetReviewModel,
  FoodReviewModel,
} from "../model/discriminator";

import { createNewDocumnet, readAllDocument } from "../handlers/factoryHandler";
import { GCS_BUCKET_NAME } from "../constants";
import { aggregationPipeline } from "../utils/Aggregation";

import {
  handleImageUpload,
  processMultipleImages,
} from "../middleware/imageProcessMiddleware";

import { preFillReviewFoundHelpFul } from "../middleware/reviewPreFillers";

export { protectRoute } from "./userController";
export { preFillUserId } from "../middleware/preFillers";
// Only SmartPhones!!

const { LEXA_PRODUCT_REVIEWS } = GCS_BUCKET_NAME;

export const handleProductReviewImage = handleImageUpload(
  5,
  LEXA_PRODUCT_REVIEWS,
  true,
  true
);
export const processProductReviewImage = processMultipleImages(
  "productReviewImages"
);

export const getProductReviewBasedOnProductId = readAllDocument(
  BaseProductReviewModel,
  {
    message: "List Of reviews for this Product",
  }
);

export const averageReviewOfProducts = async (productIds = []) => {
  const pipeline = [
    {
      $match: {
        productId: {
          $in: productIds.map((each) => new Mongoose.Types.ObjectId(each)),
        },
      },
    },
    {
      $group: {
        _id: "$productId",
        averageReview: { $avg: "$averageReview" },
        reviewersCount: { $sum: 1 },
      },
    },
  ];

  const averageReviewOfProducts = await aggregationPipeline(
    BaseProductReviewModel,
    pipeline
  );

  return averageReviewOfProducts;
};

// If the user removes image before sumbitting image has to be deleted
// export const deleteProductReviewImge = deleteFile(LEXA_PRODUCT_REVIEWS);

// Review Helpful Like/Undo

export const preFillReviewHelpulForLikeOrUndo = preFillReviewFoundHelpFul(
  ReviewHelpful,
  {
    message: "Successfully undo",
  }
);
export const reviewHelpfulPost = createNewDocumnet(ReviewHelpful, {
  message: "Success",
});

// Add review

export const addProductMobileReview = createNewDocumnet(MobileReviewModel, {
  message: "Thanks for feedback",
});

export const addProductComputerReview = createNewDocumnet(ComputerReviewModel, {
  message: "Thanks for feedback",
});

export const addProductElectronicsReview = createNewDocumnet(
  ElectronicsReviewModel,
  {
    message: "Thanks for feedback",
  }
);

export const addProductBeautyReview = createNewDocumnet(BeautyReviewModel, {
  message: "Thanks for feedback",
});

export const addProductFashionReview = createNewDocumnet(FashionReviewModel, {
  message: "Thanks for feedback",
});

export const addProductKitchenReview = createNewDocumnet(KitchenReviewModel, {
  message: "Thanks for feedback",
});

export const addProductPetReview = createNewDocumnet(PetReviewModel, {
  message: "Thanks for feedback",
});

export const addProductFoodReview = createNewDocumnet(FoodReviewModel, {
  message: "Thanks for feedback",
});
