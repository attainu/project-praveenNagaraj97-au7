import { Schema } from "mongoose";
import { BaseProductReviewModel } from "../productReviewModel";

const mobileReviewSchema = new Schema(
  {
    faceRecognition: {
      type: Number,
      max: 5,
      min: 0.1,
      required: [true, "Mobile Must contain Face Recognition review"],
      select: false,
    },
    cameraQuality: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Camera Quality review"],
    },
    pictureQuality: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Picture Quality review"],
    },
    screenQuality: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Screen Quality review"],
    },
    soundQuality: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Sound Quality review"],
    },
    batteryLife: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Battery Life  review"],
    },
    valueForMoney: {
      type: Number,
      max: 5,
      min: 0.1,
      select: false,
      required: [true, "Mobile Must contain Value For Money review"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mobileReviewSchema.pre("save", function (next) {
  this.averageReview =
    (this.faceRecognition +
      this.batteryLife +
      this.valueForMoney +
      this.screenQuality +
      this.soundQuality +
      this.pictureQuality +
      this.cameraQuality) /
    7;
  next();
});

export const MobileReviewModel = BaseProductReviewModel.discriminator(
  "MobileReview",
  mobileReviewSchema
);
