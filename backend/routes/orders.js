const express = require("express");
const Order = require("../models/order");
const mongoose = require('mongoose')

const router = express.Router();

router.post("/:id", (req, res, next) => {
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
    period: req.body.period,
    items: req.body.items,
    agentId: req.params.id,
  });
  newOrder.save().then((createOrder) => {
    res.status(201).json({
      // newOrder: {
      //   ...createOrder,
      //   id: createOrder._id,
      // },
      newOrder: createOrder
    });
  });
});

router.get("", (req, res, next) => {
  Order.find()
  .populate("agentId")
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

router.get("/:id", (req, res, next) => {
  Order.findById(req.params.id)
    .populate("agentId")
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

router.get("/total/:id", (req, res, next) => {
  Order.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
    },
    {
      $addFields: {
        total: {
          $sum: "$items.netPrice",
        },
      },
    }
  ])
  .then((total) => {
    res.status(200).json({
      message: "total",
      order: total,
    });
  });
});

router.get("/period/:id", (req, res, next) => {
  Order.find(req.body.period)
  .then((order) => {
    res.status(200).json({
      Orders: order
    })
  })
})

module.exports = router;
