import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";

import { uploadImageToGoogle, deleteFile } from "../utils/GCloudStorageService";

export const handleImageUpload = (
  imageCount,
  bucketName,
  inbetween = false,
  optional = false
) =>
  catchAsyncError(async (req, res, next) => {
    if (optional && !req.files) {
      return next();
    }
    try {
      if (optional && !req.files.length) {
        return next();
      }
    } catch (err) {
      return next();
    }

    if (req.files.length > imageCount)
      return next(
        new AppError(`This request takes maximum of ${imageCount} images!.`)
      );

    if (inbetween) {
      if (req.files.length < 1)
        return next(
          new AppError(`This request takes minimum of ${1} images!.`)
        );
    }
    if (!inbetween) {
      if (req.files.length < imageCount)
        return next(
          new AppError(`This request takes minimum of ${imageCount} images!.`)
        );
    }

    const imageUrls = [];
    const files = [];
    for (let i = 0; i < req.files.length; i++) {
      const validImage = /\.(gif|jpe?g|png)$/i.test(req.files[i].originalname);

      if (!validImage) {
        return next(
          new AppError("Cannot Process File of non Image Format", 415)
        );
      }
      files.push(req.files[i]);
    }

    for (let i = 0; i < req.files.length; i++) {
      const url = await uploadImageToGoogle(files[i], bucketName);
      imageUrls.push(url);
    }

    req.imageUrls = imageUrls;
    next();
  });

export const handleVideoUpload = (
  videoCount,
  bucketName,
  inbetween = false,
  optional = false
) =>
  catchAsyncError(async (req, res, next) => {
    if (optional && !req.files.length) {
      return next();
    }

    if (req.files.length > videoCount)
      return next(
        new AppError(`This request takes maximum of ${videoCount} Videos!.`)
      );

    if (inbetween) {
      if (req.files.length < req.files.length)
        return next(
          new AppError(`This request takes minimum of ${videoCount} Videos!.`)
        );
    } else {
      if (req.files.length < videoCount)
        return next(
          new AppError(`This request takes minimum of ${videoCount} Videos!.`)
        );
    }

    const videoUrls = [];
    const files = [];
    for (let i = 0; i < req.files.length; i++) {
      const validImage = /\.(mp4|mkv|wmv|mov)$/i.test(
        req.files[i].originalname
      );

      if (!validImage) {
        return next(
          new AppError(
            "Cannot Process File of non Video Format- Available Formats : mp4|mkv|wmv|mov ",
            415
          )
        );
      }
      files.push(req.files[i]);
    }

    for (let i = 0; i < req.files.length; i++) {
      const url = await uploadImageToGoogle(files[i], bucketName);
      videoUrls.push(url);
    }

    req.videoUrls = videoUrls;
    next();
  });

export const processSingleImage = (imageFieldName, optional = false) =>
  catchAsyncError(async (req, res, next) => {
    if (optional && !req.imageUrls) return next();

    req.body[imageFieldName] = req.imageUrls[0];
    next();
  });

export const processSingleVideo = (videoFieldName, optional = false) =>
  catchAsyncError(async (req, res, next) => {
    if (optional && !req.videoUrls) {
      return next();
    }

    req.body[videoFieldName] = req.videoUrls[0];
    next();
  });

export const processMultipleImages = (imagesFieldName, optional) =>
  catchAsyncError(async (req, res, next) => {
    if (optional && req.imageUrls.length === 0) return next();

    req.body[imagesFieldName] = req.imageUrls;
    next();
  });

export const handleImageUploadWithNoImageLimit = (bucketName) =>
  catchAsyncError(async (req, res, next) => {
    if (req.files.length === 0)
      return next(new AppError(`This request takes maximum of 1 Videos!.`));

    const imageUrls = [];
    const files = [];
    for (let i = 0; i < req.files.length; i++) {
      const validImage = /\.(gif|jpe?g|png)$/i.test(req.files[i].originalname);

      if (!validImage) {
        return next(
          new AppError("Cannot Process File of non Image Format", 415)
        );
      }
      files.push(req.files[i]);
    }

    for (let i = 0; i < req.files.length; i++) {
      const url = await uploadImageToGoogle(files[i], bucketName);
      imageUrls.push(url);
    }

    req.imageUrls = imageUrls;
    next();
  });

export const deleteImage = async (bucketName, filename) => {
  await deleteFile(bucketName, filename);
};
