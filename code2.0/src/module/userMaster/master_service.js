const httpStatus = require("http-status");
const {
  userMsater,
  moduleMsater,
  pageMsater,
  rightMsater,
  pageRights,
  roleMaster,
  roleRightMaster,
  userRights,
} = require("./master_model");
const ApiError = require("../../utils/ApiError");
const Q = require("q");

/**
 * Create a Company
 * @param {Object} master
 * @returns {Promise<Master>}
 */
const addModule = async (data) => {
  var deferred = Q.defer();

  const result = await moduleMsater.create(data);
  let resObj = {
    status: httpStatus.OK,
    message: "Module Created",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

module.exports = {
  addModule,
};
