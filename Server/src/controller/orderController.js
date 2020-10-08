import { Order } from "../model/OrderModel";
import { Product } from "../model/productModel";

import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";
import { readAllDocument } from "../handlers/factoryHandler";

export { protectRoute } from "./userController";
export { buyProducts, retrievePaymentIntent } from "./paymentController";
export {
  preFillGetUserOrders,
  preFillGetManufacturerOrders,
} from "../middleware/preFillers";

/**
 * @description user order via find order where user id is userID
 *              same for manufactureres
 */
export const processOrder = catchAsyncError(async (req, res, next) => {
  // All checks are done in payment controller

  const orders = [];

  for (let prod of req.itemsList) {
    const modelledOrderData = {
      paymentId: req.params.id,
      amount: prod.productPrice,
      item: prod._id,
      quantity: prod.quantity,
      manufacturerId: prod.manufacturerId,
      userId: req.user._id,
      paid: true,
      address: req.body.address,
    };
    orders.push(modelledOrderData);
  }

  const orderIds = Object.keys(req.productIdsQuantity);

  // Get Actual Quantity
  const getCurrentQuantity = await Product.find({ _id: orderIds }).select(
    "quantity"
  );

  let quantityReduceModel = [];

  for (let each of orderIds) {
    const model = {
      quantity: getCurrentQuantity.find(({ _id }) => _id == each).quantity - 1,
    };
    quantityReduceModel.push(model);
  }

  // console.log(quantityReduceModel);

  await Product.updateMany({ _id: { $in: orderIds } }, ...quantityReduceModel);

  // console.log(data);

  const order = await Order.create(orders);
  if (!order || order.length < 1)
    return next(new AppError("Something went wrong", 500));

  res.status(201).json({
    message: "Ordered Successfull",
    orderDetails: order,
  });
});

export const getOrders = readAllDocument(Order, {
  message: "List Of Order",
});
