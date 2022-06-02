const express = require("express");
const router = express.Router();

const Category = require("../models/category");

// add halfPay lists
router.post("/halfPay/:id", (req, res, next) => {
  let lottoNo = req.body.lottoNo;
  let rewardPrice = req.body.rewardPrice;
  let halfPays = { lottoNo: lottoNo, rewardPrice: rewardPrice };
  Category.findOne({ _id: req.params.id }).then((category) => {
    category.halfPay.push(halfPays);
    category.save().then(() => {
      res.status(200).json({ message: "halfPay updated" });
    });
  });
});

// clear เลขอั้น
router.put("/clear", (req, res, next) => {
  let halfPay = [];
  Category.updateMany({ halfPay: halfPay }).then((category) => {
    res.status(200).json({
      message: "clear",
    });
  });
});

router.get("", (req, res, next) => {
  Category.aggregate()
    .unwind("halfPay")
    .group({
      _id: { cateId: "$cate_id", cateName: "$cate_name"},
      halfPayLists: { $push: "$$ROOT" },
    })
    .then((category) => {
      res.status(200).json(category);
    });
});

router.post("", (req, res, next) => {
  const newCate = new Category({
    cate_id: req.body.cate_id,
    cate_name: req.body.cate_name,
    description: req.body.description,
    rewardPrice: req.body.rewardPrice,
    purchaseMaximum: req.body.purchaseMaximum,
    purchaseAmount: req.body.purchaseAmount,
    purchaseBalance: req.body.purchaseBalance,
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

router.put("/:id", (req, res, next) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    { rewardPrice: req.body.rewardPrice },
    { purchaseMaximum: req.body.purchaseMaximum }
  ).then((result) => {
    res.status(200).json({ message: "updated" });
  });
});

module.exports = router;
