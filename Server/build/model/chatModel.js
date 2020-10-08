"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var chatSchema = new _mongoose.Schema({
  sender: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide Sender ID"]
  },
  reciever: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "Provide reciever ID"]
  },
  chats: {
    type: [{
      from: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
      },
      to: {
        type: _mongoose.Schema.Types.ObjectId,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      at: {
        type: Date,
        "default": Date.now()
      }
    }]
  }
}, {
  versionKey: false,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
chatSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    model: "User",
    select: "name _id"
  }).populate({
    path: "reciever",
    model: "User",
    select: "name _id"
  });
  next();
});
var Chat = (0, _mongoose.model)("Chat", chatSchema);
var _default = Chat;
exports["default"] = _default;