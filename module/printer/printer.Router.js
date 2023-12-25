const express = require("express");
var router = express.Router();
const route = require("./printer.Controller.js");

router.post("/addData", route.addData);

module.exports = router;
