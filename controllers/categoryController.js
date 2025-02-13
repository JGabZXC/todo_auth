// noinspection JSUnusedLocalSymbols,JSCheckFunctionSignatures

const Category = require('../models/categoryModel');
const handler = require('./handlerController');

exports.checkCategory = handler.checkModel(Category);
exports.getUserCategory = handler.getOne(Category);
exports.createCategory = handler.createOne(Category);
exports.updateCategory = handler.updateOne(Category);
exports.deleteUserCategory = handler.deleteOne(Category);
