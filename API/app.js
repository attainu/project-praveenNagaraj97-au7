"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _dotenvConfig = _interopRequireDefault(require("./config/dotenvConfig"));

var _http = _interopRequireDefault(require("http"));

var _path = require("path");

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _hpp = _interopRequireDefault(require("hpp"));

var _cors = _interopRequireDefault(require("cors"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _xssClean = _interopRequireDefault(require("xss-clean"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _graphql = _interopRequireDefault(require("./graphql"));

var _errorHandler = require("./handlers/errorHandler");

var _userRouter = require("./routes/userRouter");

var _categoryRouter = require("./routes/categoryRouter");

var _productRouter = require("./routes/productRouter");

var _productDetailsRouter = require("./routes/productDetailsRouter");

var _productReviewRouter = require("./routes/productReviewRouter");

var _productAdvertisementRouter = require("./routes/productAdvertisementRouter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// apollo-graphql-server
(0, _dotenvConfig["default"])();
process.on("uncaughtException", _errorHandler.unCaughtExceptionErrorHandler);
var app = (0, _express["default"])();

_graphql["default"].applyMiddleware({
  app: app
}); // Logger


if (process.env.NODE_ENV === "development") {
  app.use((0, _morgan["default"])("dev"));
} // Compression -GZip
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.


app.use((0, _compression["default"])()); // Secured Http Headers

app.use((0, _helmet["default"])()); // Parameter Pollution (avoiding repeated query)
// WhiteList Can Be Added To Ignore Some query

app.use((0, _hpp["default"])({
  whitelist: []
})); // Cross Origin request Service

app.use((0, _cors["default"])() //   {
//   origin: ["http://localhost:3000","https://testlexa.netlify.app/" ],
//   optionsSuccessStatus: 200,
// }
); // Sanitize Against No-Sql Injection EX :email : { "gt" : '' }
// This will remove $ signs

app.use((0, _expressMongoSanitize["default"])()); // Data Sanitize for html injection

app.use((0, _xssClean["default"])()); // Header x-powered-by Express

app.disable("x-powered-by"); // 130 Requests Per Hour Rate-Limiter

var limiter = (0, _expressRateLimit["default"])({
  max: 30,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request Please Try Again After 1 hr"
});
app.use(_express["default"]["static"]((0, _path.resolve)(__dirname, "public")));
app.use(_express["default"].json({
  limit: "20kb"
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.set("view engine", "pug");
app.set("views", (0, _path.resolve)(__dirname, "views")); // Cookie Parser

app.use((0, _cookieParser["default"])());
app.get("/", function (req, res, next) {
  res.render("apiIntro");
});
app.use("/api/v1/category", _categoryRouter.categoryRouter);
app.use("/api/v1/product", _productRouter.productRouter);
app.use("/api/v1/product_detail", _productDetailsRouter.productDetailRouter);
app.use("/api/v1/product_review", _productReviewRouter.productReviewRouter);
app.use("/api/v1/advertise", _productAdvertisementRouter.productAdvertisementRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/api/v1/user", limiter);
}

app.use("/api/v1/user", _userRouter.userRouter);
app.use("*", _errorHandler.pageNotFoundError);
app.use(_errorHandler.globalErrorHandler);

var httpServer = _http["default"].createServer(app);

exports.app = httpServer;

_graphql["default"].installSubscriptionHandlers(httpServer);