const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const companyService = require("./company_service");

const createCompany = catchAsync(async (req, res) => {
  let resObj = await companyService.createCompany(req.body);
  res.status(httpStatus.CREATED).json(resObj);
});

const updateCompany = catchAsync(async (req, res) => {
  let resObj = await companyService.updateCompany(req.body);
  res.status(httpStatus.OK).json(resObj);
});

const listCompany = catchAsync(async (req, res) => {
  const filter = pick(req.body, [""]);
  const options = pick(req.body, ["sortBy", "limit", "page"]);
  let resObj = await companyService.listCompany(filter, options);
  res.status(httpStatus.OK).json(resObj);
});

const listCompanyByCode = catchAsync(async (req, res) => {
  let resObj = await companyService.getCompanyByCode(req.params);
  res.status(httpStatus.OK).json(resObj);
});

const deleteCompany = catchAsync(async (req, res) => {
  let resObj = await companyService.deleteCompany(req.params);
  res.status(httpStatus.OK).json(resObj);
});

module.exports = {
  createCompany,
  updateCompany,
  listCompany,
  listCompanyByCode,
  deleteCompany,
};
