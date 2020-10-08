import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Please Enter Product Name"],
      unique: true,
      index: true,
    },
    productCoverImage: {
      type: String,
      required: [true, "Please Upload Product Cover Image"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "Please Enter CategoryId"],
    },
    productPrice: {
      type: Number,
      required: [true, "Please Enter Product Price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Provide Number of available product qunatity"],
      min: 0,
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      required: [true, "please Enter Manufacture Id"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

productSchema.plugin(mongooseUniqueValidator);

productSchema.virtual("productImagesAndDesc", {
  ref: "ProductDescription",
  localField: "_id",
  foreignField: "productId",
});

productSchema.virtual("productFullDetails", {
  ref: "ProductDetail",
  localField: "_id",
  foreignField: "productId",
});

productSchema.virtual("productBoards", {
  ref: "ProductBoard",
  localField: "_id",
  foreignField: "productId",
});

productSchema.virtual("averageReview", {
  ref: "ProductReview",
  localField: "_id",
  foreignField: "productId",
});

productSchema.pre(/^find/, function (next) {
  // this.find({ quantity: { $gt: 0 } });

  this.populate({
    path: "categoryId",
    model: "Category",
  });

  next();
});

productSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "categoryId",
    model: "Category",
  })
    .populate("productImagesAndDesc")
    .populate("productFullDetails")
    .populate("productBoards");

  next();
});

productSchema.pre("save", function (next) {
  this.productPrice = parseInt(
    Number(this.productPrice) + 0.02 * Number(this.productPrice),
    10
  );
  next();
});

export const Product = model("Product", productSchema);

const productDescriptionAndImagesSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide Product ID"],
      unique: true,
    },
    productImages: {
      type: [String],
      required: [true, "Provide 5 unique images of the Product"],
      validate: {
        validator: function (val) {
          return val.length < 6 && val.length > 4;
        },
        message: "Provide 4-6 images of Product!!",
      },
    },

    productDescription: {
      type: String,
      required: [true, "Provide detailed description of Product"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

productDescriptionAndImagesSchema.plugin(mongooseUniqueValidator);

export const ProductDescriptionAndImages = model(
  "ProductDescription",
  productDescriptionAndImagesSchema
);

const productBoards = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, "Provide Product Id To which this Boards Resembeles.."],
    unique: true,
  },
  boardImages: {
    type: [String],
    required: [true, "Provide ProductBoards In Order"],
  },
});

export const ProductBoards = model("ProductBoard", productBoards);
