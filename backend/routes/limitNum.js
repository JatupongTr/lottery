const express = require("express");
const router = express.Router();

const Limit = require("../models/limitNum");

router.post("", (req, res, next) => {
  const newLimit = new Limit({
    limitPrice: req.body.limitPrice,
    category: req.body.category,
  });
  newLimit.save().then((limit) => {
    res.status(201).json(limit);
  });
});

router.get("", (req, res, next) => {
  Limit.find()
    .populate("category")
    .then((limitPrice) => {
      res.status(200).json(limitPrice);
    });
});

module.exports = router;
