"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    \"This **Query** Provides List of all categories with Icon\"\n    getAllCategories: [Category]\n\n    \"This **Query** will get list of all categories along with the products associated with it.\"\n    getAllCategoriesWithItsProduct: [CategoryWithProducts]\n\n    \"This **Query** provides all products along with it's Category Detail\"\n    getAllProducts: [Product]\n  }\n\n  extend type Mutation {\n    getProductBasedOnCategory(name: String): [Product]\n  }\n\n  type Category {\n    _id: ID!\n    categoryName: String!\n    categoryIcon: String!\n  }\n\n  type CategoryWithProducts {\n    category: Category!\n    products: [Product!]\n  }\n\n  type Product {\n    _id: ID!\n    productName: String!\n    productCoverImage: String!\n    categoryId: Category!\n    productPrice: Float!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ProductTypeDefs = (0, _apolloServerExpress.gql)(_templateObject());
var _default = ProductTypeDefs;
exports["default"] = _default;