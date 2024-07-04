const httpStatus = require("http-status");
const pick = require("../../utils/pick");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const userService = require("./user.service");

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.body, ["PlantCode", "Role"]);
  const options = pick(req.body, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  res.status(httpStatus.OK).json(result);
});

const getUser = catchAsync(async (req, res) => {
  const resObj = await userService.getUserById(req.params.userId);
  if (!resObj) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(resObj);
});

const updateUser = catchAsync(async (req, res) => {
  const resObj = await userService.updateUserById(req.params.userId, req.body);
  res.send(resObj);
});

const deleteUser = catchAsync(async (req, res) => {
  const resObj = await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).send(resObj);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
