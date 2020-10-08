import { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { User } from "../UserModel";

const userManufacturerSchema = new Schema({
  companyName: {
    type: String,
    required: [true, "Provide Company Name"],
    unique: true,
  },
  countryofOrigin: {
    type: String,
    required: [true, "Provide the Country Of Origin Of Your Company"],
  },
  mfrId: {
    type: String,
  },
  warehouseLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (val) {
          return val.length === 2;
        },
        message: "Provide Latitude and longitude of your warehouse",
      },
    },
  },
});

userManufacturerSchema.plugin(mongooseUniqueValidator);
// userManufacturerSchema.index("warehouseLocation", "2dsphere");

export const ManufacturerModel = User.discriminator(
  "Manufacturer",
  userManufacturerSchema
);
