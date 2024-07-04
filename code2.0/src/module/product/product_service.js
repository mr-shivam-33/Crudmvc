const httpStatus = require("http-status");
const Product = require("./product_model");
const ApiError = require("../../utils/ApiError");
const Q = require("q");
const { default: mongoose } = require("mongoose");

/**
 * Get Product by Code
 * @param {ObjectId} ProductCode
 * @returns {Promise<Product>}
 */
const getProductByCode = async (ProductCode) => {
  var deferred = Q.defer();
  let resObj = await Product.findOne({ ProductCode, Active: true });

  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Product List
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Product>}
 */
const listProducts = async (filter, options) => {
  var deferred = Q.defer();
  const result = await Product.paginate(filter, options);
  let resObj = {
    status: httpStatus.OK,
    message: "List product",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Create a Product
 * @param {Object} productData
 * @returns {Promise<Product>}
 */
const addProduct = async (productData) => {
  var deferred = Q.defer();

  let isProductExist = await getProductByCode(productData.ProductCode);
  console.log("isProductExist :>> ", isProductExist);
  if (isProductExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product Code already exist");
  }

  const result = await Product.create(productData);
  let resObj = {
    status: httpStatus.OK,
    message: "Product Created",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

/**
 * Update a Product
 * @param {Object} productData
 * @returns {Promise<Product>}
 */
const updateProduct = async (productData) => {
  var deferred = Q.defer();
  const result = await Product.findOneAndUpdate(
    {
      $and: [{ _id: new mongoose.Types.ObjectId(productData.id) }],
    },
    {
      $set: productData,
    },
    { new: true }
  );

  let resObj = {
    status: httpStatus.OK,
    message: "Product Updated",
    data: result,
  };
  deferred.resolve(resObj);
  return deferred.promise;
};

module.exports = {
  addProduct,
  updateProduct,
  listProducts,
  getProductByCode,
};
