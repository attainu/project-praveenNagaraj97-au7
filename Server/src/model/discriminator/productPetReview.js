import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const PetProductReviewSchema = new Schema({
  howHappyIsYourPet: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide pet happines rating for Pet Product"],
  },
  quality: {
    type: Number,
    min: 0.1,
    max: 5,
    required: [true, "Provide freshness rating for Pet Product"],
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

PetProductReviewSchema.pre("save", function (next) {
  this.averageReview =
    (this.packaging +
      this.valueForMoney +
      this.quality +
      this.howHappyIsYourPet) /
    4;

  next();
});

export const PetReviewModel = BaseProductReviewModel.discriminator(
  "PetReview",
  PetProductReviewSchema
);
