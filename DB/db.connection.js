const express = require("express");
const mongoose = require("mongoose");
const serverURI = "mongodb://127.0.0.1:27017/crudmvc";

mongoose.connect(serverURI, {
  // keepAlive: 1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log("Database not connected...", err);
});
const con = mongoose.connection.on("connected", (err, res) => {
  console.log("Local Database connected...");
});

module.exports = { con };
