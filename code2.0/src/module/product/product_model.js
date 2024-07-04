const mongoose = require("mongoose");
const { toJSON, paginate } = require("../../utils/plugins");

const productSchema = mongoose.Schema(
  {
    ProductCode: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    ProductName: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    GenericName: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    BrandName: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    Description: {
      type: String,
      trim: true,
      default: "",
    },
    GTIN: {
      type: String,
      trim: true,
      default: "",
    },
    UOM: {
      type: String,
      trim: true,
      default: "",
    },
    Image: {
      type: String,
      trim: true,
      default: "",
    },
    PackSize: {
      type: String,
      trim: true,
      default: "",
    },
    Active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * @typedef Product
 */
const Product = mongoose.model("product", productSchema, "coll_product");

module.exports = Product;
