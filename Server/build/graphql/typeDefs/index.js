"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _user = _interopRequireDefault(require("./user"));

var _products = _interopRequireDefault(require("./products"));

var _chat = _interopRequireDefault(require("./chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  scalar BigInt\n\n  type Query {\n    \"This **Query** Provides details about developer\"\n    aboutDeveloper: AboutMe\n  }\n\n  type Mutation {\n    _rootMutation(name: String): String\n  }\n\n  type Subscription {\n    _rootSubscription: String\n  }\n\n  type AboutMe {\n    name: String!\n    age: Int!\n    location: String!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var RootSchema = (0, _apolloServerExpress.gql)(_templateObject());
var typeDefs = [RootSchema, _user["default"], _products["default"], _chat["default"]];
var _default = typeDefs;
exports["default"] = _default;