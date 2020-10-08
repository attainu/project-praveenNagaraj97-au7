"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _middleware = require("../../middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var MESSENGER = "MESSENGER";
var ChatResolvers = {
  Query: {
    getMyChats: function () {
      var _getMyChats = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
        var User, Chat, req, _yield$authCheck, user, error, withWhom, chats, result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                User = _ref.User, Chat = _ref.Chat, req = _ref.req;
                _context.next = 3;
                return (0, _middleware.authCheck)(req, User);

              case 3:
                _yield$authCheck = _context.sent;
                user = _yield$authCheck.user;
                error = _yield$authCheck.error;

                if (!error) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", (0, _apolloServerExpress.AuthenticationError)(error));

              case 8:
                withWhom = args.withWhom;

                if (withWhom) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", new _apolloServerExpress.ApolloError("Provide ID of end User!", 422));

              case 11:
                _context.next = 13;
                return Chat.findOne({
                  sender: String(user._id),
                  reciever: String(withWhom)
                });

              case 13:
                chats = _context.sent;

                if (chats) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", new _apolloServerExpress.ApolloError("No Chats Found", 204));

              case 16:
                result = {
                  message: "Chats between ".concat(chats.sender.name, " and ").concat(chats.reciever.name),
                  chats: chats.chats
                };
                return _context.abrupt("return", result);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getMyChats(_x, _x2, _x3, _x4) {
        return _getMyChats.apply(this, arguments);
      }

      return getMyChats;
    }()
  },
  Mutation: {
    sendMessage: function () {
      var _sendMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref2, info) {
        var User, Chat, req, pubsub, input, _yield$authCheck2, error, user, to, chats, chatExist, writtenData;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                User = _ref2.User, Chat = _ref2.Chat, req = _ref2.req, pubsub = _ref2.pubsub;
                input = _objectSpread({}, args);

                if (input.to) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.ApolloError("Enter the sender Detail", 422));

              case 4:
                if (input.message) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.ApolloError("Message cannot be empty", 422));

              case 6:
                _context2.next = 8;
                return (0, _middleware.authCheck)(req, User);

              case 8:
                _yield$authCheck2 = _context2.sent;
                error = _yield$authCheck2.error;
                user = _yield$authCheck2.user;

                if (!error) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.AuthenticationError(error));

              case 13:
                if (!(input.to == user._id)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", new _apolloServerExpress.ApolloError("You are not allowed to send message to yourseld", 422));

              case 15:
                to = _mongoose["default"].Types.ObjectId(input.to);
                chats = {
                  from: user._id,
                  to: to,
                  message: input.message
                }; // Check If Chat Box exist between reciever and sender!

                _context2.next = 19;
                return Chat.findOne({
                  sender: user._id,
                  reciever: to
                });

              case 19:
                chatExist = _context2.sent;

                if (!(!chatExist || chatExist.length < 1)) {
                  _context2.next = 32;
                  break;
                }

                _context2.next = 23;
                return Chat.create({
                  sender: user._id,
                  reciever: input.to
                });

              case 23:
                _context2.next = 25;
                return Chat.create({
                  sender: input.to,
                  reciever: user._id
                });

              case 25:
                _context2.next = 27;
                return Chat.findOneAndUpdate({
                  sender: user._id
                }, {
                  $push: {
                    chats: chats
                  }
                }, {
                  upsert: true,
                  runValidators: true,
                  setDefaultsOnInsert: true,
                  context: "query",
                  "new": true
                });

              case 27:
                writtenData = _context2.sent;
                _context2.next = 30;
                return Chat.findOneAndUpdate({
                  sender: to
                }, {
                  $push: {
                    chats: chats
                  }
                }, {
                  upsert: true,
                  runValidators: true,
                  setDefaultsOnInsert: true,
                  context: "query",
                  "new": true
                });

              case 30:
                _context2.next = 37;
                break;

              case 32:
                _context2.next = 34;
                return Chat.findOneAndUpdate({
                  sender: user._id
                }, {
                  $push: {
                    chats: chats
                  }
                }, {
                  upsert: true,
                  runValidators: true,
                  setDefaultsOnInsert: true,
                  context: "query",
                  "new": true
                });

              case 34:
                writtenData = _context2.sent;
                _context2.next = 37;
                return Chat.findOneAndUpdate({
                  sender: to
                }, {
                  $push: {
                    chats: chats
                  }
                }, {
                  upsert: true,
                  runValidators: true,
                  setDefaultsOnInsert: true,
                  context: "query",
                  "new": true
                });

              case 37:
                _context2.next = 39;
                return pubsub.publish(MESSENGER, {
                  messenger: writtenData
                });

              case 39:
                return _context2.abrupt("return", writtenData);

              case 40:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function sendMessage(_x5, _x6, _x7, _x8) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  },
  Subscription: {
    messenger: {
      subscribe: (0, _apolloServerExpress.withFilter)(function (parent, args, _ref3, info) {
        var pubsub = _ref3.pubsub;
        return pubsub.asyncIterator([MESSENGER]);
      }, function (_ref4, _ref5, context, info) {
        var messenger = _ref4.messenger;
        var userId = _ref5.userId;

        if (userId == messenger.sender.id || userId == messenger.reciever.id) {
          return true;
        }

        return false;
      })
    }
  }
};
var _default = ChatResolvers;
exports["default"] = _default;