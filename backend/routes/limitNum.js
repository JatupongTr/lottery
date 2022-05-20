const express = require("express");
const router = express.Router();

const Limit = require("../models/limitNum");

/* router.post("", (req, res, next) => {
  const newLimit = new Limit({
    limitPrice: req.body.limitPrice,
    category: req.body.category,
  });
  newLimit.save().then((limit) => {
    newLimit
  });
}); */

router.post("", (req, res, next) => {
  for (let i = 0; i < req.body.length; i++) {
    let newLimit = new Limit({
      limitPrice: req.body[i].limitPrice,
      category: req.body[i].category
    });

    newLimit.save().then((limit) => {
      res.status(201).json({
        newLimit
      });
    });
  }
});

router.get("", (req, res, next) => {
  Limit.find()
    .populate("category")
    .sort({"category": 1})
    .then((limitPrice) => {
      res.status(200).json(limitPrice);
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
