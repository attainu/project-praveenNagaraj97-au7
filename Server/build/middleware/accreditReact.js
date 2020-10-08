"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accreditReact = void 0;

// Don't Edit This File
// This is Exclusive for React App Only.
var accreditReact = function accreditReact(req, res, next) {
  res.status(200).json({
    message: true,
    userId: req.user._id
  });
};

exports.accreditReact = accreditReact;