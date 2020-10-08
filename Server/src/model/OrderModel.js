import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const orderSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: [true, "Provide Payment Succedded Id"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      required: [true, "Provide total amount of the order"],
    },
    item: {
      type: Schema.Types.ObjectId,
    },
    quantity: {
      type: Number,
      min: 1,
    },
    manufacturerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    delivered: {
      type: String,
      enum: [
        "delivered",
        "not-delivered",
        "cancelled",
        "pending",
        "dispatched",
        "confirmed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.plugin(mongooseUniqueValidator);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "item",
    model: "Product",
  })
    .populate({
      path: "userId",
      model: "User",
      select: ["name", "email", "phoneNumber"],
    })
    .populate({
      path: "manufacturerId",
      model: "Manufacturer",
      select: ["email", "companyName", "phoneNumber", "warehouseLocation"],
    });
  next();
});

export const Order = model("Order", orderSchema);
