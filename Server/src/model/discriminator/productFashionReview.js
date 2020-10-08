import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const fashionProductReviewSchema = new Schema({
  fitting: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide fitting rating for Fashion Product"],
  },
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Fashion Product"],
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

fashionProductReviewSchema.pre("save", function (next) {
  this.averageReview =
    (this.packaging + this.valueForMoney + this.quality + this.fitting) / 4;

  next();
});

export const FashionReviewModel = BaseProductReviewModel.discriminator(
  "FashionReview",
  fashionProductReviewSchema
);
