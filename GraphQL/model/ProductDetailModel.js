import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const productDetailSchema = new Schema({
  // Irrespitive of the mobile sub-type the details applies to all model,
  //   For this Ids Same details will be Shown
  productId: {
    type: [Schema.Types.ObjectId],
    required: [
      true,
      "productId needs to be provided in order to Get This details, at time of querying!",
    ],
    unique: true,
  },
  manufacturerId: {
    type: Schema.Types.ObjectId,
    required: [true, "please Enter Manufacture Id"],
  },
  featuresList: {
    type: [String],
    required: [true, "Enter List Of Feature for this Mobile"],
  },
  productVideo: {
    type: String,
  },
  productDetails: {
    type: Object,
  },
});

productDetailSchema.plugin(mongooseUniqueValidator);

productDetailSchema.pre(/^find/, function (next) {
  this.populate({
    path: "manufacturerId",
    model: "ProductManufacturer",
  });
  next();
});

export const ProductDetailModel = model("ProductDetail", productDetailSchema);
