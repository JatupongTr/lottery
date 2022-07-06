const express = require("express");
const Order = require("../models/order");
const mongoose = require("mongoose");
const Category = require("../models/category");
const Notification = require("../models/notification");

const router = express.Router();

// create order
router.post("/:id", async (req, res, next) => {
  let items = [];
  for (let i = 0; i < req.body.length; i++) {
    let item = {
      lottoNo: req.body[i].lottoNo,
      price: req.body[i].price,
      discount: req.body[i].discount,
      netPrice: req.body[i].netPrice,
      categoryId: req.body[i].categoryId,
    };
    items.push(item);
  }
  let newOrder = new Order({
    customer: req.body.customer,
    period: req.body.period,
    items: req.body.items,
    agentId: req.params.id,
  });
  try {
    for (let i = 0; i < newOrder.items.length; i++) {
      const category = await Category.findOne({
        _id: newOrder.items[i].categoryId,
      });

      let newAmount = category.purchaseAmount;

      if (!category) {
        return res.status(404).json({ message: "category not found" });
      }

      if (category) {
        newAmount += newOrder.items[i].netPrice;
        if (category.available == false) {
          newOrder.items[i].netPrice = 0;
          newOrder.items[i].price = 0;
          continue;
        } else if (newAmount <= category.purchaseMaximum) {
          category.purchaseAmount = newAmount;
          category.purchaseBalance = category.purchaseMaximum - newAmount;
        } else if (newAmount > category.purchaseMaximum) {
          let overPrice = 0;
          category.purchaseAmount = newAmount;
          overPrice = newAmount - category.purchaseMaximum;
          newOrder.items[i].cutPrice = overPrice;
          newOrder.items[i].netPrice -= newOrder.items[i].cutPrice;
          category.purchaseAmount -= newOrder.items[i].cutPrice;
          newOrder.items[i].overPrice = true;
          category.purchaseBalance =
            category.purchaseMaximum - category.purchaseAmount;
            category.available = false
        }
        await category.save();
      }

    }
    await newOrder.save();
    res.status(201).json({ message: "Order created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/totals/:agentId/:period", (req, res, next) => {
  Order.find({ agentId: req.params.agentId }, { period: req.params.period })
    .populate("agentId")
    .populate({
      path: "items",
      populate: {
        path: "categoryId",
      },
    })
    .sort({ _id: -1 })
    .then((order) => {
      res.status(200).json({
        message: "Orders",
        Orders: order,
      });
    });
});

router.post("/remove/:id", (req, res, next) => {
  const itemId = req.body.id;
  Order.findOne({ _id: req.params.id }).then((order) => {
    order.items.pull(itemId);
    order.save().then((order) => {
      res.status(200).json({
        message: "item Deleted",
        result: order,
      });
    });
  });
});

// get overPrice
router.post("/overPrice/check", (req, res, next) => {
  Order.aggregate()
    .unwind("$items")
    .match({
      $and: [{ period: req.body.period }, { "items.overPrice": true }],
    })
    .lookup({
      from: "categories",
      localField: "items.categoryId",
      foreignField: "_id",
      as: "items.categoryId",
    })
    .group({
      _id: null,
      lists: { $push: "$$ROOT" },
      totals: { $sum: "$items.cutPrice" },
    })
    .unwind("$lists")
    .then((orders) => {
      res.status(200).json(orders);
    });
});

router.get("/:id", (req, res, next) => {
  Order.findById(req.params.id)
    .populate("agentId")
    .populate("items.categoryId")
    .then((order) => {
      if (!order) {
        res.status(404).json({
          message: "Not found",
        });
      } else {
        res.status(200).json({
          order: order,
        });
      }
    });
});

router.get("/total/category/:agentId/:period", (req, res, next) => {
  Order.aggregate([
    {
      $match: {
        $and: [
          { agentId: mongoose.Types.ObjectId(req.params.agentId) },
          { period: req.params.period },
        ],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 1,
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.categoryId",
        totals: { $sum: "$items.netPrice" },
      },
    },
  ]).then((result) => {
    res.status(200).json({
      orders: result,
    });
  });
});

router.get("/total/:agentId/:period", (req, res, next) => {
  Order.aggregate([
    {
      $match: {
        $and: [
          { agentId: mongoose.Types.ObjectId(req.params.agentId) },
          { period: req.params.period },
        ],
      },
    },
    {
      $addFields: {
        netTotal: {
          $sum: "$items.netPrice",
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]).then((order) => {
    res.status(200).json({
      Orders: order,
    });
  });
});

router.get("", (req, res, next) => {
  Order.aggregate()
    .unwind("items")
    .lookup({
      from: "categories",
      localField: "items.categoryId",
      foreignField: "_id",
      as: "items.categoryId",
    })
    .lookup({
      from: "agents",
      localField: "agentId",
      foreignField: "_id",
      as: "agentId",
    })
    .then((orders) => {
      res.status(200).json(orders);
    });
});

//check order
router.get("/check/:period", (req, res, next) => {
  let period = req.params.period;
  Order.find({
    period: period,
  })
    .populate("agentId")
    .populate("items.categoryId")
    .sort({ "agent.code": 1 })
    .then((order) => {
      res.status(200).json(order);
    });
});

module.exports = router;
