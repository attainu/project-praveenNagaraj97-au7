import { Schema, model } from "mongoose";

const advertisementSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
  },

  link: {
    type: String,
    validate: {
      validator: function (val) {
        return this.productId ? false : true;
      },
      message: "Link is Allowed only when productId is not specified",
    },
  },

  soldTo: {
    type: Schema.Types.ObjectId,
    required: [true, "Provide manufacturer Id Who is Buying!"],
  },

  startDate: {
    type: Date,
    required: [
      true,
      "Provide the start date from when the advertisement should be displayed",
    ],
  },
  endDate: {
    type: Date,
    required: [
      true,
      "Provide the end date from when the advertisement should be taken-off",
    ],
  },
});

const AdvertisementModel = model("PaidAdvertisement", advertisementSchema);

advertisementSchema.pre(/^find/, function (next) {
  this.populate({
    path: "productId",
    model: "Product",
    select: ["categoryId"],
  });

  next();
});

// only one advertisement allowed for time duration!!!
const topLevelAdvertiseSchema = new Schema({
  // 1k per-day
  amount: {
    type: Number,
    enum: [1000],
    required: [true, "Amount per day"],
  },
  advertiseBoard: {
    type: String,
    required: [true, "Provide Advertisement board/image"],
  },
});

export const TopLevelAdvertiseModel = AdvertisementModel.discriminator(
  "TopLevelAdvertise",
  topLevelAdvertiseSchema
);

// 5 advertisements allowed
export const secondLevelAdvertiseModel = AdvertisementModel.discriminator(
  "SecondLevelAdvertise",
  new Schema({
    amount: {
      type: Number,
      enum: [500],
      required: [true, "Amount per day"],
    },
    advertiseBoard: {
      type: String,
      required: [true, "Provide Advertisement board/image"],
    },
  })
);
