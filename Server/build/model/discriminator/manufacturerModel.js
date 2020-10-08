"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManufacturerModel = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var _UserModel = require("../UserModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userManufacturerSchema = new _mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Provide Company Name"],
    unique: true
  },
  countryofOrigin: {
    type: String,
    required: [true, "Provide the Country Of Origin Of Your Company"]
  },
  mfrId: {
    type: String
  },
  warehouseLocation: {
    type: {
      type: String,
      "enum": ["Point"],
      "default": "Point"
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function validator(val) {
          return val.length === 2;
        },
        message: "Provide Latitude and longitude of your warehouse"
      }
    }
  }
});
userManufacturerSchema.plugin(_mongooseUniqueValidator["default"]); // userManufacturerSchema.index("warehouseLocation", "2dsphere");

var ManufacturerModel = _UserModel.User.discriminator("Manufacturer", userManufacturerSchema);

exports.ManufacturerModel = ManufacturerModel;