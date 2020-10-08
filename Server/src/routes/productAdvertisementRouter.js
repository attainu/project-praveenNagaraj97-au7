import { Router } from "express";
import multer from "multer";

const upload = multer();

import {
  addNewTopLevelAdvertisement,
  handleTopLevelAdvertiseBoard,
  processTopLevelImage,
  getToplevelAdvertisement,

  // Protect middleware
  protectRoute,
  restrictTo,
} from "../controller/productsAdvertisementController";

export const productAdvertisementRouter = Router();

productAdvertisementRouter
  .route("/buyTopLevelAdvertise")
  .post(
    upload.array("advertiseBoard"),
    protectRoute,
    restrictTo("manufacturer"),
    handleTopLevelAdvertiseBoard,
    processTopLevelImage,
    addNewTopLevelAdvertisement
  );

productAdvertisementRouter
  .route("/getTopLevelAdvertise")
  .get(getToplevelAdvertisement);
