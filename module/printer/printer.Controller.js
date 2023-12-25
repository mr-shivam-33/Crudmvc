const express = require("express");
const UserService = require("./printer.Service.js");

module.exports = {
  addData: (req, res) => {
    try {
      UserService.addData(req.body).then((result) => {
        if (result.status == 1) {
          res.json({
            responseStatus: 1,
            responseMsgCode: "success",
            responseData: result.data,
          });
        } else {
          res.json({
            responseStatus: 0,
            responseMsgCode: "failure.",
            responseData: result.data,
          });
        }
      });
    } catch (error) {
      res.status(200).send({
        responseStatus: 0,
        responseMsgCode: "processFailed",
        responseData: { err: error },
        responseInvalid: 0,
      });
    }
  },
};
