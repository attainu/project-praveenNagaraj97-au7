import {
  TopLevelAdvertiseModel,
  secondLevelAdvertiseModel,
} from "../model/AdvertisementModel";

import { createNewDocumnet, readAllDocument } from "../handlers/factoryHandler";
import {
  handleImageUpload,
  processSingleImage,
} from "../middleware/imageProcessMiddleware";

/**
 * @param {count} only 1 advertise is allowed for the period of time
 */
export { protectRoute, restrictTo } from "./userController";

export const handleTopLevelAdvertiseBoard = handleImageUpload(
  1,
  "lexa-advertisement-boards",
  false,
  false
);
export const processTopLevelImage = processSingleImage("advertiseBoard", false);

export const addNewTopLevelAdvertisement = createNewDocumnet(
  TopLevelAdvertiseModel,
  {
    message: "Successfully booked advertise board",
  }
);

export const getToplevelAdvertisement = readAllDocument(
  TopLevelAdvertiseModel,
  {
    message: "requested advertise",
  }
);
