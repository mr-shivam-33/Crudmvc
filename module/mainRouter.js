const express = require("express");
var router = express.Router();
const subroot = require("./printer/printer.Router.js");

router.use("/org", subroot);

module.exports = router;
