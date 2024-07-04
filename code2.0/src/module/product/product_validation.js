const Joi = require("joi");

const addProduct = Joi.object().keys({
  ProductCode: Joi.string().required(),
  ProductName: Joi.string().required(),
  GenericName: Joi.string().required(),
  BrandName: Joi.string().required(),
  Description: Joi.string(),
  GTIN: Joi.string(),
  UOM: Joi.string(),
  Image: Joi.string(),
  PackSize: Joi.string(),
  Active: Joi.boolean(),
});

const updateProduct = Joi.object().keys({
  id: Joi.string().required(),
  ProductName: Joi.string().required(),
  GenericName: Joi.string().required(),
  BrandName: Joi.string().required(),
  Description: Joi.string(),
  GTIN: Joi.string(),
  UOM: Joi.string(),
  Image: Joi.string(),
  PackSize: Joi.string(),
  Active: Joi.boolean(),
});

const listProducts = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
module.exports = {
  addProduct,
  updateProduct,
  listProducts,
};
