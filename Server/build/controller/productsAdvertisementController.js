"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "protectRoute", {
  enumerable: true,
  get: function get() {
    return _userController.protectRoute;
  }
});
Object.defineProperty(exports, "restrictTo", {
  enumerable: true,
  get: function get() {
    return _userController.restrictTo;
  }
});
exports.getToplevelAdvertisement = exports.addNewTopLevelAdvertisement = exports.processTopLevelImage = exports.handleTopLevelAdvertiseBoard = void 0;

var _AdvertisementModel = require("../model/AdvertisementModel");

var _factoryHandler = require("../handlers/factoryHandler");

var _imageProcessMiddleware = require("../middleware/imageProcessMiddleware");

var _userController = require("./userController");

/**
 * @param {count} only 1 advertise is allowed for the period of time
 */
var handleTopLevelAdvertiseBoard = (0, _imageProcessMiddleware.handleImageUpload)(1, "lexa-advertisement-boards", false, false);
exports.handleTopLevelAdvertiseBoard = handleTopLevelAdvertiseBoard;
var processTopLevelImage = (0, _imageProcessMiddleware.processSingleImage)("advertiseBoard", false);
exports.processTopLevelImage = processTopLevelImage;
var addNewTopLevelAdvertisement = (0, _factoryHandler.createNewDocumnet)(_AdvertisementModel.TopLevelAdvertiseModel, {
  message: "Successfully booked advertise board"
});
exports.addNewTopLevelAdvertisement = addNewTopLevelAdvertisement;
var getToplevelAdvertisement = (0, _factoryHandler.readAllDocument)(_AdvertisementModel.TopLevelAdvertiseModel, {
  message: "requested advertise"
});
exports.getToplevelAdvertisement = getToplevelAdvertisement;