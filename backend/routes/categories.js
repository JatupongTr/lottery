const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.post("", (req, res, next) => {
  const newCate = new Category({
    cate_id: req.body.cate_id,
    cate_name: req.body.cate_name,
    description: req.body.description
  });
  newCate.save().then((category) => {
    res.status(201).json({
      newCate: {
        ...category,
        id: category._id,
      },
    });
  });
});

router.get("", (req, res, next) => {
  Category.find().then((document) => {
    res.status(200).json({
      message: "Categories fetched",
      categories: document,
    });
  });
});

router.get("/two", (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "topTwoDigits" }, { cate_id: "downTwoDigits" }],
  }).then((document) => {
    res.status(200).json({
      message: "2 digits",
      categories: document,
    });
  });
});

router.get("/running", (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "topRunDigits" }, { cate_id: "downRunDigits" }],
  }).then((document) => {
    res.status(200).json({
      message: "running",
      categories: document,
    });
  });
});

router.get("/three", (req, res, next) => {
  Category.find({
    $or: [
      { cate_id: "topThreeDigits" },
      { cate_id: "toddThreeDigits" },
      { cate_id: "firstThreeDigits" },
      { cate_id: "lastThreeDigits" },
      { cate_id: "downThreeDigits" },
    ],
  }).then((document) => {
    res.status(200).json({
      message: "3 digits",
      categories: document,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Category.findById(req.params.id).then((category) => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  });
});

router.put('/:id', (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    cate_id: req.body.cate_id,
    rewardPrice: req.body.rewardPrice,
  })
  Category.updateOne({ _id: req.params.id }, category).then(result => {
    res.status(200).json(category)
  })
})

module.exports = router;
