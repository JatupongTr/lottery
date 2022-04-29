const express = require("express");
const Settings = require("../models/settings");
const Order = require("../models/order");
const mongoose = require("mongoose");
const router = express.Router();

router.post("", (req, res, next) => {
  let keepPrices = new Settings({
    toddThreeDigits: req.body.toddThreeDigits,
    topThreeDigits: req.body.topThreeDigits,
    downThreeDigits: req.body.downThreeDigits,
    firstThreeDigits: req.body.firstThreeDigits,
    lastThreeDigits: req.body.lastThreeDigits,
    topTwoDigits: req.body.topTwoDigits,
    downTwoDigits: req.body.downTwoDigits,
    topRunDigits: req.body.topRunDigits,
    downRunDigits: req.body.downRunDigits,
  });  

  keepPrices.save().then((settings) => {
    res.status(201).json({
      message: "set up limit successfully",
      settings
    });
  });
});

router.get("", (req, res, next) => {
  Settings.find().then((documents) => {
    res.status(200).json({
      message: "Settings fetched successfully",
      settingss: documents,
    });
  });
});

router.get("/totalOrders", (req, res, next) => {
  
  Order.aggregate([
    /* {
      $match: {
        $and: [
          { agentId: mongoose.Types.ObjectId(req.params.agentId) },
          { period: req.params.period },
        ],
      },
    }, */
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.categoryId.cate_id",
        totals: { $sum: "$items.netPrice" },
        /* lists: {$push: "$$ROOT"} */
      },
    },
    {
      $lookup: {
        from: "limits",
        localField: "categoryId.id",
        foreignField: "category.cate_id",
        as: "limitPrice"
      }
    },
    /* {
      $sort: {
        "_id": 1
      }
    }, */
  ]).then((result) => {
    res.status(200).json({
      orders: result,
    });
  });

});

//test ยอดเกิน
router.get("/testOrders", (req, res, next) => {
  Order.aggregate([
    { $unwind: "$items" },
    {
      $lookup: {
        from: "agents",
        localField: "agentId",
        foreignField: "_id",
        as: "agent",
      },
    },
    {
      $lookup: {
        from: "limits",
        localField: "categoryId.id",
        foreignField: "category.cate_id",
        as: "limitPrice"
      }
    },
  ])
    .sort({ "agent.code": 1 })
    .then((order) => {
      res.status(200).json(order);
    });
});

router.delete("", (req, res, next) => {
  Settings.deleteMany()
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
