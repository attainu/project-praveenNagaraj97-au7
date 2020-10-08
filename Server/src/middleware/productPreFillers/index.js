import { averageReviewOfProducts } from "../../controller/productReviewController";
import { AppError } from "../../utils/AppError";
import catchAsyncError from "../../utils/catchAsyncError";
import { deleteImage } from "../imageProcessMiddleware";

export const preFillCartIdasParams = (req, res, next) => {
  if (!req.body.cartItems || req.body.cartItems.length === 0)
    return next(new AppError("Provide Cart List of Product Ids", 422));

  req.query.listOfRecords = req.body.cartItems;
  next();
};

export const preFillProductdetailedDescription = (req, res, next) => {
  if (req.body.featuresList.length < 1)
    return next(new AppError("Provide List Of Features as array!!!", 422));
  req.body.featuresList = JSON.parse(req.body.featuresList);
  req.body.productDetails = JSON.parse(req.body.productDetails);
  next();
};

export const preFillProductBoards = (req, res, next) => {
  req.body.productId = req.body.productId.split(",");
  next();
};

export const preFillManufacturerId = (req, res, next) => {
  if (req.user.userRole == "manufacturer") {
    req.body.manufacturerId = req.user._id;
  } else {
    if (!req.body.manufacturerId) {
      return next(new AppError("Provide manufacturer Id"));
    }
  }
  next();
};

export const getAllProductsWithAverageReviewAttached = catchAsyncError(
  async (req, res, next) => {
    /**
     * @desc - as limit of each request is set to max-10 items
     *         performace doesn't get affected as aggregation pipeline is used!
     * @requires - this middleware needs to be changed on model fields chanege or virtual fields added
     */
    const ids = [];
    for (let i = 0; i < req.details.length; i++) {
      ids.push(req.details[i]._id);
    }
    const averageReview = await averageReviewOfProducts(ids);

    const details = [];

    for (let j = 0; j < req.details.length; j++) {
      const response = req.details[j];
      details.push({
        _id: response._id,
        productName: response.productName,
        categoryId: {
          _id: response.categoryId ? response.categoryId._id : undefined,
          categoryName: response.categoryId
            ? response.categoryId.categoryName
            : undefined,
          categoryIcon: response.categoryId
            ? response.categoryId.categoryIcon
            : undefined,
          id: response.categoryId ? response.categoryId.id : undefined,
        },
        productPrice: response.productPrice,
        productCoverImage: response.productCoverImage,
        quantity: response.quantity,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        manufacturerId: response.manufacturerId,
        id: response.id,
        averageReview: averageReview.filter(
          (each) => String(each._id) === String(response._id)
        ),
      });
    }

    res.status(200).json({
      foundResults: req.details.length,
      message: req.message,
      details,
    });
  }
);

export const deleteCategoryCoverImageFromGCloud = (
  ModelName,
  bucketName
) => async (req, res, next) => {
  const category = await ModelName.findById(req.params.id);

  try {
    await deleteImage(
      bucketName,
      category.categoryIcon.split(bucketName + "/")[1]
    );
  } catch (err) {
    next();
  }

  next();
};
