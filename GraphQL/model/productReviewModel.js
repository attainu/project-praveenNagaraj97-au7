import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

// Only review can be given by user for one product!

const baseProductReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide Provide Id on which you are reviewing"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide User Id"],
      // validate: {
      //   validator: async function (val) {
      //     const review = await BaseProductReviewModel.findOne({
      //       userId: val,
      //       productId: this.productId,
      //     });
      //     if (review) {
      //       return String(review.productId) !== String(this.productId);
      //     } else return true;
      //   },
      //   message: "You can only review once",
      // },
    },
    title: {
      type: String,
      required: [true, "Provide Title for the review"],
      validate: {
        validator: function (val) {
          return String(val).length > 3;
        },
        message: "Enter Valid Title",
      },
    },
    description: {
      type: String,
      required: [true, "Provide Description for the review"],
      validate: {
        validator: function (val) {
          return String(val).length > 10;
        },
        message: "Description should be atleast 10 letters",
      },
    },
    averageReview: {
      type: Number,
    },

    productReviewImages: {
      type: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

baseProductReviewSchema.plugin(mongooseUniqueValidator);

baseProductReviewSchema.virtual("foundHelpful", {
  ref: "ReviewHelpful",
  localField: "_id",
  foreignField: "reviewId",
});

baseProductReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    model: "User",
    select: ["name"],
  }).populate("foundHelpful", ["-helpul"]);

  // this.find({ title: { $exists: true } });

  next();
});

baseProductReviewSchema.pre("save", function (next) {
  if (this.productReviewImages.length === 0) {
    this.productReviewImages = undefined;
  }

  if (this.title && !this.description) {
    throw new Error("Please Provide Description");
  }

  if (!this.title && this.description) {
    // delete uploaded images
    throw new Error("Please Provide title");
  }

  if (!this.title && !this.description && this.productReviewImages) {
    // delete uploaded images
    throw new Error("Please Provide title and Description");
  }

  next();
});

export const BaseProductReviewModel = model(
  "ProductReview",
  baseProductReviewSchema
);

const reviewHelpfulSchema = new Schema(
  {
    reviewId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide Review ID"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide User ID"],
      validate: {
        validator: async function (val) {
          const docx = await ReviewHelpful.findOne({
            userId: val,
            reviewId: this.reviewId,
          });
          return docx ? false : true;
        },
        message: "You are allowed to like only once",
      },
    },
    helpul: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
reviewHelpfulSchema.plugin(mongooseUniqueValidator);

export const ReviewHelpful = model("ReviewHelpful", reviewHelpfulSchema);
