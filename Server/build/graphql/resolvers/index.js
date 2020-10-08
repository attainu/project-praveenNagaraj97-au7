"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloTypeBigint = _interopRequireDefault(require("apollo-type-bigint"));

var _products = _interopRequireDefault(require("./products"));

var _Authentication = _interopRequireDefault(require("./user/Authentication"));

var _chat = _interopRequireDefault(require("./chat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BigIntresolver = {
  BigInt: new _apolloTypeBigint["default"]("safe")
};
var MySelf = {
  name: "Praveen Nagaraj",
  age: 22,
  location: "Bangalore"
};

var Query = _objectSpread(_objectSpread({
  aboutDeveloper: function aboutDeveloper() {
    return MySelf;
  }
}, _products["default"].Query), _chat["default"].Query);

var Mutation = _objectSpread(_objectSpread(_objectSpread({
  _rootMutation: function _rootMutation(parent, args, context, info) {
    return "Welcome ".concat(args.name);
  }
}, _products["default"].Mutation), _Authentication["default"].Mutation), _chat["default"].Mutation);

var Subscription = _objectSpread({}, _chat["default"].Subscription);

var resolvers = Object.assign({}, {
  Query: Query,
  Mutation: Mutation,
  Subscription: Subscription,
  BigInt: BigIntresolver
});
var _default = resolvers;
exports["default"] = _default;