"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewHelpful = exports.BaseProductReviewModel = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Only review can be given by user for one product!
var baseProductReviewSchema = new _mongoose.Schema({
  productId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide Provide Id on which you are reviewing"]
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide User Id"],
    validate: {
      validator: function () {
        var _validator = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
          var review;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return BaseProductReviewModel.findOne({
                    userId: val,
                    productId: this.productId
                  });

                case 2:
                  review = _context.sent;

                  if (!review) {
                    _context.next = 7;
                    break;
                  }

                  return _context.abrupt("return", String(review.productId) !== String(this.productId));

                case 7:
                  return _context.abrupt("return", true);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function validator(_x) {
          return _validator.apply(this, arguments);
        }

        return validator;
      }(),
      message: "You can only review once"
    }
  },
  title: {
    type: String,
    required: [true, "Provide Title for the review"],
    validate: {
      validator: function validator(val) {
        return String(val).length > 3;
      },
      message: "Enter Valid Title"
    }
  },
  description: {
    type: String,
    required: [true, "Provide Description for the review"],
    validate: {
      validator: function validator(val) {
        return String(val).length > 10;
      },
      message: "Description should be atleast 10 letters"
    }
  },
  averageReview: {
    type: Number
  },
  productReviewImages: {
    type: [String]
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
baseProductReviewSchema.plugin(_mongooseUniqueValidator["default"]);
baseProductReviewSchema.virtual("foundHelpful", {
  ref: "ReviewHelpful",
  localField: "_id",
  foreignField: "reviewId"
});
baseProductReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    model: "User",
    select: ["name"]
  }).populate("foundHelpful", ["-helpul"]); // this.find({ title: { $exists: true } });

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
var BaseProductReviewModel = (0, _mongoose.model)("ProductReview", baseProductReviewSchema);
exports.BaseProductReviewModel = BaseProductReviewModel;
var reviewHelpfulSchema = new _mongoose.Schema({
  reviewId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide Review ID"]
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide User ID"],
    validate: {
      validator: function () {
        var _validator2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val) {
          var docx;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return ReviewHelpful.findOne({
                    userId: val,
                    reviewId: this.reviewId
                  });

                case 2:
                  docx = _context2.sent;
                  return _context2.abrupt("return", docx ? false : true);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function validator(_x2) {
          return _validator2.apply(this, arguments);
        }

        return validator;
      }(),
      message: "You are allowed to like only once"
    }
  },
  helpul: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
reviewHelpfulSchema.plugin(_mongooseUniqueValidator["default"]);
var ReviewHelpful = (0, _mongoose.model)("ReviewHelpful", reviewHelpfulSchema);
exports.ReviewHelpful = ReviewHelpful;