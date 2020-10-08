"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = require("mongoose");

var _validator = require("validator");

var _bcrypt = require("bcrypt");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name !"]
  },
  email: {
    type: String,
    required: [true, "Please Enter Email !"],
    validate: {
      validator: function validator(val) {
        return (0, _validator.isEmail)(val);
      },
      message: "Please Enter a valid Email Address"
    },
    unique: true
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please Enter Phone Number"],
    validate: {
      validator: function validator(val) {
        return String(val).length === 10 && String(val).charAt(0) > 6;
      },
      message: "Enter Valid Number"
    },
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please Confirm Your Password"],
    select: false,
    validate: {
      validator: function validator(val) {
        return this.password === val;
      },
      message: "Password Didn't match!"
    }
  },
  userRole: {
    type: String,
    "enum": ["user", "manufacturer", "dev"],
    "default": "user"
  },
  // if user found misleading account will be set to inactive instaed of deleting
  accountActive: {
    type: Boolean,
    "default": true
  },
  passwordModified: {
    type: Date
  },
  resetToken: {
    type: Object,
    select: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
}); // Plugin to show Duplicate entries

userSchema.plugin(_mongooseUniqueValidator["default"]);
userSchema.pre("save", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var salt, hashed;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _bcrypt.genSalt)(12);

        case 2:
          salt = _context.sent;
          _context.next = 5;
          return (0, _bcrypt.hash)(this.password, salt);

        case 5:
          hashed = _context.sent;
          this.password = hashed;
          this.confirmPassword = undefined;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}))); // Decrypt Password

userSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(inputPassword, dbStoredPassword) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _bcrypt.compare)(inputPassword, dbStoredPassword);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

userSchema.methods.createUserResetPasswordToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
    var resetToken;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Create a new Token from crypto as this is for 5 min only
            // Delete the token once the password is changed
            resetToken = _toConsumableArray(Array(70)).map(function (i) {
              return (~~(Math.random() * 36)).toString(36);
            }).join("");
            _context3.next = 3;
            return User.findByIdAndUpdate(userId, {
              resetToken: {
                token: resetToken,
                timeStamp: Number(Date.now()) + Number(process.env.PASSWORD_RESET_TIME)
              }
            });

          case 3:
            return _context3.abrupt("return", resetToken);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var User = (0, _mongoose.model)("User", userSchema);
exports.User = User;