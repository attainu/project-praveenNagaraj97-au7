"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImageToGoogle = exports.deleteFile = exports.GCloudStorageServices = void 0;

var _storage = require("@google-cloud/storage");

var _path = require("path");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GCloudStorageServices = /*#__PURE__*/function () {
  function GCloudStorageServices() {
    _classCallCheck(this, GCloudStorageServices);

    this.storage = new _storage.Storage({
      projectId: "lexa-api",
      keyFilename: (0, _path.resolve)(__dirname, "..", "config", "lexa-api.json")
    });
    this.createStorage = this.createStorage.bind(this);
    this.deleteBucket = this.deleteBucket.bind(this);
    this.listBuckets = this.listBuckets.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.storageBucketAssigner = this.storageBucketAssigner.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  } // Storage service


  _createClass(GCloudStorageServices, [{
    key: "createStorage",
    value: function () {
      var _createStorage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(bucketName) {
        var _yield$this$storage$c, _yield$this$storage$c2, bucket;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.storage.createBucket(bucketName, {
                  location: "ASIA",
                  storageClass: "STANDARD"
                });

              case 3:
                _yield$this$storage$c = _context.sent;
                _yield$this$storage$c2 = _slicedToArray(_yield$this$storage$c, 1);
                bucket = _yield$this$storage$c2[0];
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw new Error(_context.t0.message);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function createStorage(_x) {
        return _createStorage.apply(this, arguments);
      }

      return createStorage;
    }()
  }, {
    key: "deleteFile",
    value: function () {
      var _deleteFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(bucketName, fileName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.storage.bucket(bucketName).file(fileName)["delete"]();

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteFile(_x2, _x3) {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }()
  }, {
    key: "listBuckets",
    value: function () {
      var _listBuckets = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _yield$this$storage$g, _yield$this$storage$g2, buckets, bucketsList;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.storage.getBuckets();

              case 2:
                _yield$this$storage$g = _context3.sent;
                _yield$this$storage$g2 = _slicedToArray(_yield$this$storage$g, 1);
                buckets = _yield$this$storage$g2[0];
                bucketsList = [];
                buckets.forEach(function (bucket) {
                  bucketsList.push(bucket.name);
                });
                return _context3.abrupt("return", bucketsList);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function listBuckets() {
        return _listBuckets.apply(this, arguments);
      }

      return listBuckets;
    }()
  }, {
    key: "deleteBucket",
    value: function () {
      var _deleteBucket = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return this.storage.bucket(bucketName)["delete"]();

              case 3:
                _context4.next = 8;
                break;

              case 5:
                _context4.prev = 5;
                _context4.t0 = _context4["catch"](0);
                throw new Error(_context4.t0.message);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 5]]);
      }));

      function deleteBucket() {
        return _deleteBucket.apply(this, arguments);
      }

      return deleteBucket;
    }()
  }, {
    key: "storageBucketAssigner",
    value: function storageBucketAssigner(bucketName) {
      return this.storage.bucket(bucketName);
    }
  }, {
    key: "uploadImage",
    value: function uploadImage(file, storageBucket) {
      return new Promise(function (resolve, reject) {
        //   fields needed from file we uploaded.
        var originalname = file.originalname,
            buffer = file.buffer; // converting the file into blob/binary large object.

        var blob = storageBucket.file(originalname.split(" ").join(""));
        var blobStream = blob.createWriteStream({
          resumable: false
        });
        blobStream.on("finish", function () {
          var publicUrl = "https://storage.googleapis.com/".concat(storageBucket.name, "/").concat(blob.name);
          resolve(publicUrl);
        }).on("error", function () {
          reject("Unable to upload image, something went wrong");
        }).end(buffer);
      });
    } // Final uploader function

  }]);

  return GCloudStorageServices;
}();

exports.GCloudStorageServices = GCloudStorageServices;

var _GCloudStorageService = new GCloudStorageServices(),
    createStorage = _GCloudStorageService.createStorage,
    uploadImage = _GCloudStorageService.uploadImage,
    listBuckets = _GCloudStorageService.listBuckets,
    storageBucketAssigner = _GCloudStorageService.storageBucketAssigner,
    deleteFile = _GCloudStorageService.deleteFile;

exports.deleteFile = deleteFile;

var uploadImageToGoogle = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(file, bucketName) {
    var bucketsList, googleStorage, publicUrl;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return listBuckets();

          case 2:
            bucketsList = _context5.sent;

            if (bucketsList.includes(bucketName)) {
              _context5.next = 8;
              break;
            }

            _context5.next = 6;
            return createStorage(bucketName);

          case 6:
            _context5.next = 8;
            break;

          case 8:
            googleStorage = storageBucketAssigner(bucketName);
            _context5.next = 11;
            return uploadImage(file, googleStorage);

          case 11:
            publicUrl = _context5.sent;
            return _context5.abrupt("return", publicUrl);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function uploadImageToGoogle(_x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadImageToGoogle = uploadImageToGoogle;