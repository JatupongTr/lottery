const express = require("express");
const Limit = require("../models/limitNumber");
const router = express.Router();

router.post("", (req, res, next) => {
  for (let i = 0; i < req.body.length; i++) {
    let newLimit = new Limit({
      limitNumber: req.body[i].limitNumber,
      typeNumber: req.body[i].typeNumber
    });
    
    newLimit.save().then((limit) => {
      res.status(201).json({
        message: "set up successfully",
        limit
      });
    });
  }
});

router.get("", (req, res, next) => {
  Limit.find().then((documents) => {
    res.status(200).json({
      message: "Settings fetched successfully",
      Limit: documents,
    });
  });
});

router.delete("", (req, res, next) => {
  Limit.deleteMany()
    .then((resutl) => {
      res.status(200).json({
        message: "Settings Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
