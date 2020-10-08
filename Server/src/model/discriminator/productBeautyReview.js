import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const beautyProductReviewSchema = new Schema({
  freshness: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Beauty Product"],
  },
  packaging: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide rating for Package of product"],
  },
  valueForMoney: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Value For Money rating for electronics"],
  },
});

beautyProductReviewSchema.pre("save", function (next) {
  this.averageReview =
    (this.packaging + this.valueForMoney + this.freshness) / 3;

  next();
});

export const BeautyReviewModel = BaseProductReviewModel.discriminator(
  "BeautyReview",
  beautyProductReviewSchema
);
