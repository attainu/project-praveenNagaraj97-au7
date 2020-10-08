"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Query {\n    getMyChats(withWhom: ID!): ChatsList!\n  }\n\n  extend type Mutation {\n    sendMessage(to: ID!, message: String!): Message!\n  }\n\n  extend type Subscription {\n    messenger(userId: ID!): Message\n  }\n\n  type ChatsList {\n    message: String\n    chats: [Chat]\n  }\n\n  type Chat {\n    _id: ID!\n    from: ID!\n    to: ID!\n    message: String\n    at: String\n  }\n\n  type messager {\n    _id: ID!\n    name: String!\n  }\n\n  type Message {\n    chats: [Chat!]\n    _id: ID!\n    sender: messager\n    reciever: messager\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ChatTypeDefs = (0, _apolloServerExpress.gql)(_templateObject());
var _default = ChatTypeDefs;
exports["default"] = _default;