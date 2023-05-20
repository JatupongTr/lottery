const Category = require("../models/category");

exports.createHalfPay = (req, res, next) => {
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
}

exports.resetCategory = (req, res, next) => {
  let purchaseAmount = 0;
  let purchaseBalance = 0;
  let purchaseMaximum = 0;
  let categoryId = [
    "64590e1b3c8573ced0c89c2c",
    "64590e3f3c8573ced0c89c34",
    "64590e763c8573ced0c89c39",
    "64590e853c8573ced0c89c3b",
    "64590eab3c8573ced0c89c41",
    "64590ebe3c8573ced0c89c43",
    "64590ece3c8573ced0c89c45",
    "64590efb3c8573ced0c89c47",
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
}

exports.removeHalfPay = (req, res, next) => {
  const itemId = req.body.halfPayId;
  Category.findOne({ _id: req.params.id }).then((category) => {
    category.halfPay.pull(itemId);
    category.save().then((category) => {
      res.status(200).json({
        message: "item Deleted",
      });
    });
  });
}

exports.clearHalfPay = (req, res, next) => {
  let halfPay = [];
  Category.updateMany({ halfPay: halfPay }).then((category) => {
    res.status(200).json({
      message: "clear",
    });
  });
}

exports.getCategories = (req, res, next) => {
  Category.find().then((document) => {
    res.status(200).json({
      message: "Categories fetched",
      categories: document,
    });
  });
}

exports.getHalfPay = (req, res, next) => {
  Category.aggregate()
    .unwind("halfPay")
    .sort({ cate_id: 1 })
    .then((halfPay) => {
      res.status(200).json(halfPay);
    });
}

exports.createCategory = (req, res, next) => {
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
}

exports.getTwoDigits = (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "topTwoDigits" }, { cate_id: "downTwoDigits" }],
  }).then((document) => {
    res.status(200).json({
      message: "2 digits",
      categories: document,
    });
  });
}

exports.getRunningDigits = (req, res, next) => {
  Category.find({
    $or: [{ cate_id: "topRunDigits" }, { cate_id: "downRunDigits" }],
  }).then((document) => {
    res.status(200).json({
      message: "running",
      categories: document,
    });
  });
}

exports.getThreeDigits = (req, res, next) => {
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
}

exports.getCategoryById = (req, res, next) => {
  Category.findById(req.params.id).then((category) => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  });
}

exports.updateRewardPrice = (req, res, next) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    { rewardPrice: req.body.rewardPrice, halfPayReward: req.body.halfPayReward }
  ).then((result) => {
    res.status(200).json({ message: "updated" });
  });
}

exports.updatePurchaseMax = (req, res, next) => {
  Category.findByIdAndUpdate(
    { _id: req.params.id },
    { purchaseMaximum: req.body.purchaseMaximum }
  ).then((category) => {
    res.status(200).json({ message: "updated" });
  });
}
