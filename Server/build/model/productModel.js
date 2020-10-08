"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductBoards = exports.ProductDescriptionAndImages = exports.Product = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productSchema = new _mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please Enter Product Name"],
    unique: true,
    index: true
  },
  productCoverImage: {
    type: String,
    required: [true, "Please Upload Product Cover Image"]
  },
  categoryId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Please Enter CategoryId"]
  },
  productPrice: {
    type: Number,
    required: [true, "Please Enter Product Price"]
  },
  quantity: {
    type: Number,
    required: [true, "Please Provide Number of available product qunatity"],
    min: 0
  },
  manufacturerId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "please Enter Manufacture Id"]
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
productSchema.plugin(_mongooseUniqueValidator["default"]);
productSchema.virtual("productImagesAndDesc", {
  ref: "ProductDescription",
  localField: "_id",
  foreignField: "productId"
});
productSchema.virtual("productFullDetails", {
  ref: "ProductDetail",
  localField: "_id",
  foreignField: "productId"
});
productSchema.virtual("productBoards", {
  ref: "ProductBoard",
  localField: "_id",
  foreignField: "productId"
});
productSchema.virtual("averageReview", {
  ref: "ProductReview",
  localField: "_id",
  foreignField: "productId"
});
productSchema.pre(/^find/, function (next) {
  // this.find({ quantity: { $gt: 0 } });
  this.populate({
    path: "categoryId",
    model: "Category"
  });
  next();
});
productSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "categoryId",
    model: "Category"
  }).populate("productImagesAndDesc").populate("productFullDetails").populate("productBoards");
  next();
});
productSchema.pre("save", function (next) {
  this.productPrice = parseInt(Number(this.productPrice) + 0.02 * Number(this.productPrice), 10);
  next();
});
var Product = (0, _mongoose.model)("Product", productSchema);
exports.Product = Product;
var productDescriptionAndImagesSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide Product ID"],
    unique: true
  },
  productImages: {
    type: [String],
    required: [true, "Provide 5 unique images of the Product"],
    validate: {
      validator: function validator(val) {
        return val.length < 6 && val.length > 4;
      },
      message: "Provide 4-6 images of Product!!"
    }
  },
  productDescription: {
    type: String,
    required: [true, "Provide detailed description of Product"]
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
productDescriptionAndImagesSchema.plugin(_mongooseUniqueValidator["default"]);
var ProductDescriptionAndImages = (0, _mongoose.model)("ProductDescription", productDescriptionAndImagesSchema);
exports.ProductDescriptionAndImages = ProductDescriptionAndImages;
var productBoards = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide Product Id To which this Boards Resembeles.."],
    unique: true
  },
  boardImages: {
    type: [String],
    required: [true, "Provide ProductBoards In Order"]
  }
});
var ProductBoards = (0, _mongoose.model)("ProductBoard", productBoards);
exports.ProductBoards = ProductBoards;