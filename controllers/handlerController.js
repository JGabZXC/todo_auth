// noinspection JSUnusedLocalSymbols,JSUnresolvedReference

const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.checkModel = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({
      _id: req.params.id,
      userID: req.user._id,
    });
    if (!doc) return next(new AppError('No document found with that ID', 404));

    next();
  });

exports.getAll = (Model, filterOptions) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(
      Model.find(
        typeof filterOptions === 'function'
          ? filterOptions(req)
          : filterOptions,
      ),
      req.query,
    )
      .filter()
      .sort()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      length: doc.length,
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.status)
      return next(
        new AppError('You cannot set status when creating a todo', 400),
      );

    if (req.body.role)
      return next(
        new AppError('You cannot set role when creating a user', 400),
      );

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, filterOptions) =>
  catchAsync(async (req, res, next) => {
    // reassigning filterOptions directly can sometimes lead to unexpected behavior! It is because of closures behavior and mutation of the original filterOptions object.

    // In my case, I directly manipulated the filterOptions object, which caused it to become a static object (e.g., { userID: "8238asd2387s3" }). As a result, the filterOptions retained the userID of the previous user across subsequent requests. This led to the query always returning documents associated with the previous user's userID, rather than dynamically updating to reflect the current user's userID.

    // Approached that I use that works
    // simply put this as an argument: typeof filterOptions === 'function' ? filterOptions(req) : filterOptions
    // store it to any variable: const finalFilter = typeof filterOptions === 'function' ? filterOptions(req) : filterOptions;
    const doc = await Model.findOne(
      typeof filterOptions === 'function' ? filterOptions(req) : filterOptions,
    );

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.userID)
      return next(new AppError(`You can't update userID`, 400));

    if (req.body.validToken)
      return next(new AppError(`You can't update token`, 400));

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
