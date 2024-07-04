const httpStatus = require("http-status");
const Company = require("./company_model");
const ApiError = require("../../utils/ApiError");
const Q = require("q");

/**
 * Get Company by Code
 * @param {ObjectId} Code
 * @returns {Promise<Company>}
 */
const getCompanyByCode = async (Code) => {
  var deferred = Q.defer();
  let result = await Company.findOne({
    Code: Code.Code || Code,
  });

  let resObj = {
    status: httpStatus.OK,
    message: "Company Details",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Create a Company
 * @param {Object} companyData
 * @returns {Promise<Company>}
 */
const createCompany = async (companyData) => {
  var deferred = Q.defer();
  let isCompanyExist = await getCompanyByCode(companyData.Code);
  if (isCompanyExist.data) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Company Code already exist");
  }

  const result = await Company.create(companyData);
  let resObj = {
    status: httpStatus.OK,
    message: "Company Created",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Update a Company
 * @param {Object} companyData
 * @returns {Promise<Company>}
 */
const updateCompany = async (companyData) => {
  var deferred = Q.defer();
  const result = await Company.findOneAndUpdate(
    {
      $and: [{ Code: companyData.Code }],
    },
    {
      $set: companyData,
    },
    { new: true }
  );

  let resObj = {
    status: httpStatus.OK,
    message: "Company Details Updated",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * List a Company
 * @param {Object}
 * @returns {Promise<Company>}
 */
const listCompany = async (filter, options) => {
  var deferred = Q.defer();
  filter.Status = 1;
  let result = await Company.paginate(filter, options);
  let resObj = {
    status: httpStatus.OK,
    message: "Companies Details",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * List Company by Code
 * @param {ObjectId} Code
 * @returns {Promise<Company>}
 */
const deleteCompany = async (Code) => {
  var deferred = Q.defer();
  const result = await Company.findOneAndUpdate(
    {
      $and: [{ Code: Code.Code }],
    },
    {
      $set: { Status: 0 },
    },
    { new: true }
  );

  let resObj = {
    status: httpStatus.OK,
    message: "Company Deleted",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

module.exports = {
  createCompany,
  updateCompany,
  getCompanyByCode,
  listCompany,
  deleteCompany,
};
