const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("../../utils/plugins");

const companySchema = mongoose.Schema(
  {
    Code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    City: {
      type: String,
      required: true,
      trim: true,
    },
    State: {
      type: String,
      required: true,
      trim: true,
    },
    Country: {
      type: String,
      required: true,
      trim: true,
    },
    PinCode: {
      type: String,
      required: true,
      trim: true,
    },
    LicenseNo: {
      type: String,
      required: true,
      trim: true,
    },
    CompanyType: {
      type: Number,
      required: true,
    },
    Active: {
      type: Boolean,
      default: false,
    },
    Status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
companySchema.plugin(toJSON);
companySchema.plugin(paginate);

const company = mongoose.model("company", companySchema, "coll_company");

module.exports = company;
