import React from "react";

import "../../styles/productReviewForm.scss";
import {
  ProductComputerReview,
  ProductElectronicsReview,
  ProductMobileReview,
  ProductBeautyReview,
  ProductFashionReview,
  ProductKitchenReview,
  ProductPetReview,
  ProductFoodReview,
} from "./helpers";

/**
 * @file - productReviewImages.
 * @description - takes default title,description and images for all types.
 * @access - Protected Route User has to be Logged In to access this component
 */

export const ProductReviewForm = ({ productReviewDetail }) => {
  if (productReviewDetail.category === "mobiles") {
    return <ProductMobileReview productReviewDetail={productReviewDetail} />;
  }

  if (productReviewDetail.category === "computers") {
    return <ProductComputerReview productReviewDetail={productReviewDetail} />;
  }

  if (productReviewDetail.category === "electronics") {
    return (
      <ProductElectronicsReview productReviewDetail={productReviewDetail} />
    );
  }

  if (productReviewDetail.category === "beauty") {
    return <ProductBeautyReview productReviewDetail={productReviewDetail} />;
  }

  if (productReviewDetail.category === "fashion") {
    return <ProductFashionReview productReviewDetail={productReviewDetail} />;
  }

  if (productReviewDetail.category === "kitchen") {
    return <ProductKitchenReview productReviewDetail={productReviewDetail} />;
  }

  if (productReviewDetail.category === "pet") {
    return <ProductPetReview productReviewDetail={productReviewDetail} />;
  }
  if (productReviewDetail.category === "food") {
    return <ProductFoodReview productReviewDetail={productReviewDetail} />;
  }

  return <h1>Something went wrong this is not page you are suppose to see</h1>;
};
