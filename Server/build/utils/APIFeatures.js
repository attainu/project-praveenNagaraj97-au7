"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiFeatures = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiFeatures = /*#__PURE__*/function () {
  // QueryObj is Model.find() query is req.query
  // final it will be like Model.find(req.query)
  function ApiFeatures(queryObj, query) {
    _classCallCheck(this, ApiFeatures);

    this.query = query;
    this.queryObj = queryObj;
  }

  _createClass(ApiFeatures, [{
    key: "filter",
    value: function filter() {
      var query = _objectSpread({}, this.query);

      var excludeFileds = ["page", "limit", "sort", "fields", "searchin", "searchTerm", "listOfRecords"];
      excludeFileds.forEach(function (fields) {
        delete query[fields];
      });
      var queryStr = JSON.stringify(query);
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, function (match) {
        return "$".concat(match);
      });
      this.queryObj = this.queryObj.find(JSON.parse(queryStr));
      return this;
    }
  }, {
    key: "sort",
    value: function sort() {
      if (this.query.sort) {
        this.queryObj = this.queryObj.sort(this.query.sort.split(",").join(" "));
      }

      return this;
    } // Virtual Fields Doesn't Support This
    // Because it relay on Some Fields

  }, {
    key: "limit",
    value: function limit() {
      if (this.query.fields) {
        this.queryObj = this.queryObj.select(this.query.fields.split(",").join(" "));
      } else {
        this.queryObj = this.queryObj.select("-__v");
      }

      return this;
    }
  }, {
    key: "pagination",
    value: function pagination() {
      if (this.query.page) {
        var page = parseInt(this.query.page) || 1;
        var limit = parseInt(this.query.limit) || 6;
        var skipVal = (page - 1) * limit;
        this.queryObj = this.queryObj.skip(skipVal).limit(limit);
      }

      return this;
    }
  }, {
    key: "search",
    value: function search() {
      if (this.query.searchin) {
        var _this$query = this.query,
            searchin = _this$query.searchin,
            searchTerm = _this$query.searchTerm;
        this.queryObj = this.queryObj.find(_defineProperty({}, searchin, {
          $regex: searchTerm,
          $options: "gi"
        }));
      }

      return this;
    }
  }, {
    key: "listOfRecords",
    value: function listOfRecords() {
      if (this.query.listOfRecords) {
        var listOfIds;

        if (typeof this.query.listOfRecords === "string") {
          try {
            listOfIds = JSON.parse(this.query.listOfRecords);
          } catch (err) {
            throw new Error("Provide Only List Of Ids");
          }
        } else {
          listOfIds = this.query.listOfRecords;
        }

        this.queryObj = this.queryObj.find({
          _id: {
            $in: listOfIds
          }
        });
      }

      return this;
    }
  }]);

  return ApiFeatures;
}();

exports.ApiFeatures = ApiFeatures;