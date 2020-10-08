import { AppError } from "../utils/AppError";
import catchAsyncError from "../utils/catchAsyncError";
import { ApiFeatures } from "../utils/APIFeatures";

export const createNewDocumnet = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const response = await ModelName.create(req.body);
    if (!response) return next(new AppError("request failed", 422));

    res.status(201).json({
      message: responseMessage.message,
      details: response,
    });
  });

export const readAllDocument = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const featuredModel = new ApiFeatures(ModelName.find(), req.query)
      .filter()
      .limit()
      .pagination()
      .search()
      .sort()
      .listOfRecords();

    const response = await featuredModel.queryObj;

    if (!response || response.length === 0)
      return next(new AppError("No Document Found", 404));

    if (responseMessage.hasOwnProperty("next")) {
      req.details = response;
      req.message = responseMessage.message;
      return next();
    }

    res.status(200).json({
      foundResults: response.length,
      message: responseMessage.message,
      details: response,
    });
  });

export const readDocumentByIdThroughQuery = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.query.id)
      return next(
        new AppError("Provide Id of the Document You are Querying !!", 422)
      );
    const docs = await ModelName.findById(req.query.id);

    if (!docs)
      return next(new AppError("No Results found With The Given Id", 204));

    res.status(200).json({
      message: responseMessage.message,
      detail: docs,
    });
  });

// export const readDocumentByFields = (ModelName, responseMessage) =>
//   catchAsyncError(async (req, res, next) => {
//     if (!req.query) return new AppError("Provide Find Fields in query");

//     const docs = await ModelName.findOne(req.query);
//     if (!docs)
//       return next(new AppError("No Results found With The Given Id", 204));

//     res.status(200).json({
//       message: responseMessage.message,
//       detail: docs,
//     });
//   });

export const updateDocumentByID = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!Object.keys(req.body).length)
      return next(new AppError("Document Not Changed As No Values Given", 304));

    const docx = await ModelName.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
      new: true,
    });

    if (!docx)
      return next(
        new AppError(`Document with ${req.params.id} is not Found`, 500)
      );

    responseMessage.document = docx;
    responseMessage.updatedValue = req.body;
    res.status(202).json(responseMessage);
  });

// Field is passes via query!!
export const updateDocumentByField = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!Object.keys(req.body).length)
      return next(new AppError("Document Not Changed As No Values Given", 304));

    if (!req.query)
      return next(
        new AppError(
          "Specify the Field with value Which has to updated in req query!!!",
          422
        )
      );

    const docx = await ModelName.findOneAndUpdate(req.query, req.body, {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
      new: true,
    });

    if (!docx)
      return next(
        new AppError(`Document with ${req.params.id} is not Found`, 500)
      );

    responseMessage.document = docx;
    responseMessage.updatedValue = req.body;
    res.status(202).json(responseMessage);
  });

export const deleteDocumentById = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.params.id)
      return next(new AppError("Enter Id as params !!!", 406));

    const docx = await ModelName.findByIdAndDelete(req.params.id);

    if (!docx)
      return next(
        new AppError("Request failed as nothing was found with given ID", 406)
      );

    responseMessage.deltedDocument = docx;

    res.status(200).json(responseMessage);
  });
