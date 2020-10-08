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

const productManufacturerSchema = new Schema(
  {
    manufacturerName: {
      type: String,
      required: [true, "Provide Manufacturer Name"],
      unique: true,
    },
    countryofOrigin: {
      type: String,
      required: [true, "Provide the Country Of Origin Of The Product"],
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

productManufacturerSchema.plugin(mongooseUniqueValidator);

export const ProductManufacturer = model(
  "ProductManufacturer",
  productManufacturerSchema
);

const productBoards = new Schema({
  productId: {
    type: [Schema.Types.ObjectId],
    required: [
      true,
      "Provide List Of Product Ids To which this Boards Resembeles..",
    ],
    unique: true,
  },
  boardImages: {
    type: [String],
    required: [true, "Provide ProductBoards In Order"],
  },
});

export const ProductBoards = model("ProductBoard", productBoards);
