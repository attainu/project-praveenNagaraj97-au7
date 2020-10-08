"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;

var _nodemailer = require("nodemailer");

var _pug = require("pug");

var _htmlToText = require("html-to-text");

var _dotenvConfig = _interopRequireDefault(require("../config/dotenvConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(0, _dotenvConfig["default"])();

var Email = /*#__PURE__*/function () {
  function Email(user, url) {
    _classCallCheck(this, Email);

    this.to = user.email;
    this.name = user.username;
    this.url = url;
    this.from = "".concat(process.env.SENDER_NAME, " <").concat(process.env.SENDER_EMAIL, ">");
  }

  _createClass(Email, [{
    key: "createTransport",
    value: function createTransport() {
      if (process.env.NODE_ENV === "production") {
        // sendGrid
        return (0, _nodemailer.createTransport)({
          service: "SendGrid",
          auth: {
            user: process.env.SEND_GRID_USER,
            pass: process.env.SEND_GRID_PASSWORD
          }
        });
      }

      return (0, _nodemailer.createTransport)({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT,
        auth: {
          user: process.env.MAIL_TRAP_USER,
          pass: process.env.MAIL_TRAP_PASSWORD
        }
      });
    }
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(template, subject) {
        var html, mailOptions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Render HTML Based On PUG.
                html = (0, _pug.renderFile)("".concat(__dirname, "/../views/mail/").concat(template, ".pug"), {
                  name: this.name,
                  url: this.url,
                  subject: subject
                }); // Mail Options

                mailOptions = {
                  from: this.from,
                  to: this.to,
                  subject: subject,
                  html: html,
                  text: (0, _htmlToText.fromString)(html)
                }; // Transporter to send Email

                _context.next = 4;
                return this.createTransport().sendMail(mailOptions);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "sendWelcome",
    value: function () {
      var _sendWelcome = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.send("welcome", "Thank you for Joining !keep Shopping");

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sendWelcome() {
        return _sendWelcome.apply(this, arguments);
      }

      return sendWelcome;
    }()
  }, {
    key: "sendResetPassword",
    value: function () {
      var _sendResetPassword = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.send("forgotPassword", "Password reset Valid for 5 minutes");

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendResetPassword() {
        return _sendResetPassword.apply(this, arguments);
      }

      return sendResetPassword;
    }()
  }, {
    key: "sendNewEmployeeWelcome",
    value: function () {
      var _sendNewEmployeeWelcome = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.send("newEmployeeWelcome", "Welcome to Lexa Team!");

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function sendNewEmployeeWelcome() {
        return _sendNewEmployeeWelcome.apply(this, arguments);
      }

      return sendNewEmployeeWelcome;
    }()
  }, {
    key: "sendNewManufacturerWelcome",
    value: function () {
      var _sendNewManufacturerWelcome = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.send("mfrWelcome", "Thank you, Welcome to Lexa");

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function sendNewManufacturerWelcome() {
        return _sendNewManufacturerWelcome.apply(this, arguments);
      }

      return sendNewManufacturerWelcome;
    }()
  }]);

  return Email;
}();

exports.Email = Email;