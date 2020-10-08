import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const kitchenProductReviewSchema = new Schema({
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Kitchen Product"],
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
    required: [true, "Provide Value For Money rating for Kitchen utensiles"],
  },
});

kitchenProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.packaging + this.valueForMoney + this.quality) / 3;

  next();
});

export const KitchenReviewModel = BaseProductReviewModel.discriminator(
  "KitchenReview",
  kitchenProductReviewSchema
);
