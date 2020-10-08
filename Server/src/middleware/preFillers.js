export const preFillUserId = (req, res, next) => {
  req.body.userId = req.user._id;
  next();
};

export const preFillManufacturerWareHouseLocation = (req, res, next) => {
  if (typeof req.body.warehouseLocation !== "object") {
    req.body.warehouseLocation = req.body.warehouseLocation.split(",");
  }

  req.body.warehouseLocation = req.body.warehouseLocation.map((each) =>
    Number(each)
  );

  req.body.warehouseLocation = {
    type: "Point",
    coordinates: req.body.warehouseLocation,
  };
  next();
};

export const preFillGetUserOrders = (req, res, next) => {
  req.query.userId = req.user._id;
  req.query.sort = "-createdAt";
  next();
};

export const preFillGetManufacturerOrders = (req, res, next) => {
  req.query.manufacturerId = req.user._id;
  req.query.sort = "-createdAt";
  next();
};
