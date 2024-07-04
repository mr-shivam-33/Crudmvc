const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const masterService = require("./master_service");

const addModule = catchAsync(async (req, res) => {
  let resObj = await masterService.addModule(req.body);
  res.status(httpStatus.CREATED).json(resObj);
});

module.exports = {
  addModule,
};
