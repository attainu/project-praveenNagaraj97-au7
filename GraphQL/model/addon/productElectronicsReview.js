import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const electronicsProductReviewSchema = new Schema({
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide quality rating for electronics"],
  },
  valueForMoney: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide Value For Money rating for electronics"],
  },
});

electronicsProductReviewSchema.pre("save", function (next) {
  this.averageReview = (this.quality + this.valueForMoney) / 2;

  next();
});

export const ElectronicsReviewModel = BaseProductReviewModel.discriminator(
  "ElectronicsReview",
  electronicsProductReviewSchema
);
