const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const productService = require("./product_service");
const pick = require("../../utils/pick");

const listProducts = catchAsync(async (req, res) => {
  const filter = pick(req.body, []);
  const options = pick(req.body, ["sortBy", "limit", "page"]);
  const result = await productService.listProducts(filter, options);
  res.status(httpStatus.OK).json(result);
});

const getProduct = catchAsync(async (req, res) => {
  const result = await productService.getProductByCode(req.params.productCode);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  res.status(httpStatus.OK).json(result);
});

const addProduct = catchAsync(async (req, res) => {
  if (req.files.Image && req.files.Image.length) {
    req.body.Image = req.files.Image[0].path;
  }

  let resObj = await productService.addProduct(req.body);
  res.status(httpStatus.CREATED).json(resObj);
});

const updateProduct = catchAsync(async (req, res) => {
  if (req.files.Image && req.files.Image.length) {
    req.body.Image = req.files.Image[0].path;
  }

  let resObj = await productService.updateProduct(req.body);
  res.status(httpStatus.OK).json(resObj);
});

module.exports = {
  addProduct,
  updateProduct,
  listProducts,
  getProduct,
};
