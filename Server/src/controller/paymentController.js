import { Stripe } from "stripe";
import _ from "lodash";

import { Product } from "../model/productModel";
import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";

import dotenvConfig from "../config/dotenvConfig";

export { protectRoute } from "./userController";

dotenvConfig();

const stripe = new Stripe(process.env.SECRET_KEY);

/**
 * @deprecated for template views only
 */
export const paymentSessiondeprecated = catchAsyncError(
  async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: req.name,
              images: [req.image],
            },
            unit_amount: 100 * req.price,
          },
          quantity: req.quantity,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000`,
      cancel_url: `http://localhost:3000/cart`,
    });
    res.status(200).json({
      id: session.id,
    });
  }
);

/**
 * @deprecated for template views only
 */
export const buyProductsdeprecated = catchAsyncError(async (req, res, next) => {
  if (req.body.products.length < 1)
    return next(new AppError("No Products selected", 422));

  const requestedProducts = req.body.products;
  const products = await Product.find({ _id: req.body.products });

  let unit_amount = 0;
  let name = "";
  let image = "";
  let quantity = 0;

  if (requestedProducts.length === 1) {
    unit_amount = products[0].productPrice;
    name = `${products[0].productName}`;
    image = products[0].productCoverImage;
    quantity = 1;
  } else {
    for (let i = 0; i < requestedProducts.length; i++) {
      const product = products.find(({ _id }) => _id == requestedProducts[i]);
      unit_amount += product.productPrice;
      name += `
      ${i + 1 + ")" + product.productName},
      `;
    }
    quantity = requestedProducts.length;
    image =
      "https://blog-assets.lightspeedhq.com/img/2019/12/8c48d7df-retail-purchase-orders.jpg";
  }

  req.price = unit_amount;
  req.name = name;
  req.image = image;
  req.quantity = quantity;
  next();
});

export const paymentIntent = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100 * req.price,
    currency: "inr",
    description: JSON.stringify(req.body.products),
  });
  res.status(200).json({
    clientSecret: paymentIntent.client_secret,
  });
});

const addQuantityPropToProducts = (cartItems) => {
  const result = {};
  cartItems.forEach((item) => {
    result[item] = (result[item] || 0) + 1;
  });
  return result;
};

export const buyProducts = catchAsyncError(async (req, res, next) => {
  if (!req.body.products)
    return next(new AppError("No Products selected", 422));
  if (req.body.products.length < 1)
    return next(new AppError("No Products selected", 422));
  const requestedProducts = req.body.products;
  const products = await Product.find({ _id: req.body.products });

  let price = 0;
  const productIdQuantityCheck = {};
  const qunatityOfProductItems = addQuantityPropToProducts(requestedProducts);

  // Total Price Collection
  const buyingItems = products.map((item) => {
    item.quantity = qunatityOfProductItems[item._id];
    productIdQuantityCheck[item._id] = item.quantity;
    price += item.productPrice * item.quantity;
    return item;
  });

  const quantityCheck = await Product.find({ _id: req.body.products });

  // Product availablity check
  for (let i = 0; i < quantityCheck.length; i++) {
    if (
      quantityCheck[i].quantity < productIdQuantityCheck[quantityCheck[i]._id]
    ) {
      return next(
        new AppError(`${quantityCheck[i].productName} are Not available`, 500)
      );
    }
  }

  req.price = price;
  req.itemsList = buyingItems;
  req.productIdsQuantity = productIdQuantityCheck;

  next();
});

export const retrievePaymentIntent = catchAsyncError(async (req, res, next) => {
  if (!req.params.id)
    return next(new AppError("Provide Payment Intent Success ID", 422));

  const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

  if (paymentIntent.status !== "succeeded")
    return next(new AppError(paymentIntent.status, 402));
  const orderedItems = JSON.parse(paymentIntent.description);

  // Payment Modified Check
  if (!_.isEqual(orderedItems.sort(), req.body.products.sort()))
    return next(new AppError("orders alteration found not proccessable", 423));
  next();
});
