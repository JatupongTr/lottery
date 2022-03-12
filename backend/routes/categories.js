const express = require("express");
const router = express.Router();

const Category = require("../models/category");

router.post("", (req, res, next) => {
  const newCate = new Category({
    cate_id: req.body.cate_id,
    cate_name: req.body.cate_name,
    destcription: req.body.description,
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
      catories: document,
    });
  });
});
//
router.get("/two", (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "top_2_digits" }, { cate_id: "down_2_digits" }],
  }).then((document) => {
    res.status(200).json({
      message: "2 digits",
      categories: document,
    });
  });
});

router.get("/running", (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "top_run_digits" }, { cate_id: "down_run_digits" }],
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
      { cate_id: "top_3_digits" },
      { cate_id: "todd_3_digits" },
      { cate_id: "first_3_digits" },
      { cate_id: "last_3_digits" },
      { cate_id: "down_3_digits" },
    ],
  }).then((document) => {
    res.status(200).json({
      message: "3 digits",
      categories: document,
    });
  });
});

module.exports = router;
