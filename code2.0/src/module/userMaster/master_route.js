const express = require("express");
const validate = require("../../middlewares/validate");
const masterValidation = require("./master_validation");
const masterController = require("./master_controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post(
  "/addModule",
  auth(),
  validate(masterValidation.addModule),
  masterController.addModule
);

module.exports = router;
