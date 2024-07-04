const httpStatus = require("http-status");
const User = require("./user.model");
const ApiError = require("../../utils/ApiError");
const Q = require("q");
const mongoose = require("mongoose");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  var deferred = Q.defer();
  let isUserExist = await User.isUserNameTaken(userBody.UserName);
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "UserName already taken");
  }

  let createdUser = await User.create(userBody);
  let userObj = {
    status: httpStatus.OK,
    message: "User Created",
    data: createdUser,
  };
  deferred.resolve(userObj);
  return deferred.promise;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  var deferred = Q.defer();
  const users = await User.paginate(filter, options);
  let resObj = {
    status: httpStatus.OK,
    message: "List users",
    data: users,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  var deferred = Q.defer();
  let result = await User.findById(id);
  let resObj = {
    status: httpStatus.OK,
    message: "List User",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Get user by email
 * @param {string} Email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (Email) => {
  var deferred = Q.defer();
  let resObj = await User.findOne({ Email });
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Get user by UserName
 * @param {string} Email
 * @returns {Promise<User>}
 */
const getUserByUserName = async (UserName) => {
  var deferred = Q.defer();
  let resObj = await User.findOne({ UserName });
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  var deferred = Q.defer();
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  const result = await user.save();
  let resObj = {
    status: httpStatus.OK,
    message: " User details Updated",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  var deferred = Q.defer();
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await User.updateOne(
    { _id: userId },
    { $set: { Status: 0 } },
    { new: true }
  );

  let resObj = {
    status: httpStatus.OK,
    message: "User Deleted",
    data: result,
  };

  deferred.resolve(resObj);
  return deferred.promise;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByUserName,
  updateUserById,
  deleteUserById,
};
