import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";

import { deleteFile } from "../utils/GCloudStorageService";

export const preCheckCategoryInputs = (req, res, next) => {
  if (!req.body.categoryName)
    return next(new AppError("Please Enter Category Name", 422));

  next();
};

export const preCheckifProductUpdateDetailVideoHasFileAttached = (
  req,
  res,
  next
) => {
  if (!req.files) return new AppError("Select Video to Update!!!", 422);
  req.body = {};
  next();
};

export const preCheckIfPreviousVideoExistsAndDelete = (
  ModelName,
  bucketName,
  videoFieldName
) =>
  catchAsyncError(async (req, res, next) => {
    const docs = await ModelName.findOne(req.query);

    if (!docs[videoFieldName]) return next();

    await deleteFile(
      bucketName,
      docs[videoFieldName].split(bucketName + "/")[1]
    );
    next();
  });
