import catchAsyncError from "../../utils/catchAsyncError";
import { AppError } from "../../utils/AppError";

export const preFillReviewFoundHelpFul = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (req.params.bool === "true") {
      req.body.helpul = req.params.bool;
      next();
    } else {
      // find the doc and remove it!
      const docx = await ModelName.findOneAndDelete({ userId: req.user._id });

      if (!docx)
        return next(
          new AppError("This review Like doesn't belongs to you", 401)
        );

      res.status(200).json({
        message: responseMessage.message,
      });
    }
  });
