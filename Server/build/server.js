"use strict";

var _mongoose = require("mongoose");

require("regenerator-runtime");

var _app = require("./app");

var _errorHandler = require("./handlers/errorHandler");

(0, _mongoose.connect)(process.env.URIS, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Database Connection Established!");
})["catch"](function (err) {
  console.log("Database Connection Failed");
  console.log(err);
});
var port = process.env.PORT || 8080;

var server = _app.app.listen(port, function () {
  console.log("Listening on http://localhost:".concat(port, "/graphql"));
});

process.on("unhandledRejection", function (err) {
  console.log(err.name, err.message);
  console.log(err);
  (0, _errorHandler.serverCloser)(server, _mongoose.connection);
});