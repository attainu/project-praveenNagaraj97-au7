export class ApiFeatures {
  // QueryObj is Model.find() query is req.query
  // final it will be like Model.find(req.query)
  constructor(queryObj, query) {
    this.query = query;
    this.queryObj = queryObj;
  }
  filter() {
    const query = { ...this.query };
    const excludeFileds = [
      "page",
      "limit",
      "sort",
      "fields",
      "searchin",
      "searchTerm",
      "listOfRecords",
    ];
    excludeFileds.forEach((fields) => {
      delete query[fields];
    });

    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    this.queryObj = this.queryObj.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.query.sort) {
      this.queryObj = this.queryObj.sort(this.query.sort.split(",").join(" "));
    }
    return this;
  }
  // Virtual Fields Doesn't Support This
  // Because it relay on Some Fields
  limit() {
    if (this.query.fields) {
      this.queryObj = this.queryObj.select(
        this.query.fields.split(",").join(" ")
      );
    } else {
      this.queryObj = this.queryObj.select("-__v");
    }
    return this;
  }
  pagination() {
    if (this.query.page) {
      const page = parseInt(this.query.page) || 1;
      const limit = parseInt(this.query.limit) || 6;

      const skipVal = (page - 1) * limit;

      this.queryObj = this.queryObj.skip(skipVal).limit(limit);
    }
    return this;
  }

  search() {
    if (this.query.searchin) {
      const { searchin, searchTerm } = this.query;

      this.queryObj = this.queryObj.find({
        [searchin]: { $regex: searchTerm, $options: "gi" },
      });
    }
    return this;
  }

  listOfRecords() {
    if (this.query.listOfRecords) {
      let listOfIds;

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
        _id: { $in: listOfIds },
      });
    }

    return this;
  }
}
