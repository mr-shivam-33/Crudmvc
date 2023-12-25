const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Q = require("q");
const { User } = require("./printer.Model.js");
const fetch = require("node-fetch");

module.exports = {
  addData: (data) => {
    var deferred = Q.defer();

    try {
      User.create(data, (err, result) => {
        if (err) {
          let obj = { status: 0, data: err };
          deferred.resolve(obj);
        } else {
          let obj = { status: 1, data: result };
          deferred.resolve(obj);
        }
      });
    } catch (error) {
      let obj = { status: 0, data: error.message };
      deferred.resolve(obj);
    }

    return deferred.promise;
  },
};
