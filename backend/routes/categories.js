const express = require("express");
const router = express.Router();

const Category = require("../models/category");

// add halfPay lists
router.post("/halfPay", (req, res, next) => {
  let lottoNo = req.body.lottoNo;
  let halfPays = { lottoNo: lottoNo };
  Category.findOne({ _id: req.body.id })
    .then((category) => {
      category.halfPay.push(halfPays);
      category.save().then(() => {
        res.status(200).json({ message: "halfPay updated" });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "somthing wrong",
      });
    });
});

// reset
router.put("/reset", (req, res, next) => {
  let purchaseAmount = 0;
  let purchaseBalance = 0;
  let purchaseMaximum = 0;
  let categoryId = [
    "62396645db01ff9ee525f1d5",
    "62396654db01ff9ee525f1d7",
    "6239666ddb01ff9ee525f1d9",
    "6239667edb01ff9ee525f1db",
    "623966b9db01ff9ee525f1dd",
    "623966cadb01ff9ee525f1df",
    "623966e2db01ff9ee525f1e1",
    "623966f7db01ff9ee525f1e3",
    "62396709db01ff9ee525f1e5",
  ];
  for (let i = 0; i < categoryId.length; i++) {
    Category.findOne({ _id: categoryId[i] }).then((category) => {
      (category.purchaseAmount = purchaseAmount),
        (category.purchaseBalance = purchaseBalance),
        (category.purchaseMaximum = purchaseMaximum),
        category.available = true;
        category.save().then(()=> {
          res.end()
        })
    });
  }
});

//remove halfPay
router.post("/remove/:id", (req, res, next) => {
  const itemId = req.body.halfPayId;
  Category.findOne({ _id: req.params.id }).then((category) => {
    category.halfPay.pull(itemId);
    category.save().then((category) => {
      res.status(200).json({
        message: "item Deleted",
      });
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
  Category.find().then((document) => {
    res.status(200).json({
      message: "Categories fetched",
      categories: document,
    });
  });
});

router.get("/halfpay", (req, res, next) => {
  Category.aggregate()
    .unwind("halfPay")
    .sort({ cate_id: 1 })
    .then((halfPay) => {
      res.status(200).json(halfPay);
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

// เลขตัวคูณ
router.put("/rewardPrice/:id", (req, res, next) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    { rewardPrice: req.body.rewardPrice, halfPayReward: req.body.halfPayReward }
  ).then((result) => {
    res.status(200).json({ message: "updated" });
  });
});

// เลขค่าเก็บ
router.put("/purchaseMaximum/:id", (req, res, next) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    { purchaseMaximum: req.body.purchaseMaximum }
  ).then((category) => {
    res.status(200).json({ message: "updated" });
  });
});

module.exports = router;
