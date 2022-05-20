const express = require("express");
const Order = require("../models/order");
const mongoose = require("mongoose");
const Category = require("../models/category");

const router = express.Router();

// router.post("/:id", (req, res, next) => {
//   let items = [];
//   for (let i = 0; i < req.body.length; i++) {
//     let item = {
//       lottoNo: req.body[i].lottoNo,
//       price: req.body[i].price,
//       discount: req.body[i].discount,
//       netPrice: req.body[i].netPrice,
//       categoryId: req.body[i].categoryId,
//     };
//     items.push(item);
//   }
//   let newOrder = new Order({
//     customer: req.body.customer,
//     period: req.body.period,
//     items: req.body.items,
//     agentId: req.params.id,
//   });
//   newOrder.save().then((createOrder) => {
//     res.status(201).json({
//       newOrder: createOrder,
//     });
//   });
// });

// function transaction
const save = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const opts = { session };
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

    //checkPurchasesMax
    const checkPurchasesMax = await Category.find(
      {
        _id: items.categoryId,
        purchaseMaximum: { $gte: items.netPrice },
      },
      null,
      opts
    );
    if (checkPurchasesMax === null) {
      console.log("category not found");
    }
    //update purchaseMaximum after create order
    for (let i = 0; i < newOrder.items.length; i++) {
      await Category.findOneAndUpdate(
        {
          _id: newOrder.items[i].categoryId,
        },
        { $inc: { purchaseMaximum: -newOrder.items[i].netPrice } },
        opts
      );
    }
    await newOrder.save(opts);
    await session.commitTransaction();
    res.status(201).json(newOrder);
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

// create order
router.post("/:id", (req, res, next) => {
  save(req, res, next).catch(next);
});

router.get("/totals/:agentId/:period", (req, res, next) => {
  Order.find({ agentId: req.params.agentId }, { period: req.params.period })
    .populate("agentId")
    .populate("items")
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
        _id: "$items.categoryId.cate_id",
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

// test limit
router.get("", (req, res, next) => {
  Order.aggregate()
    .unwind("$items")
    .lookup({
      from: "limits",
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$categoryId.id", "$category._id"],
            },
          },
        },
      ],
      as: "limits",
    })
    .group({
      _id: "$items.categoryId.id",
      total: { $sum: "$items.netPrice" },
    })
    .then((order) => {
      res.status(200).json(order);
    });
});

//check order
router.get("/check/:period", (req, res, next) => {
  let period = req.params.period;
  Order.find({
    period: period,
  })
    .populate("agentId")
    .populate('items.categoryId')
    .sort({ "agent.code": 1 })
    .then((order) => {
      res.status(200).json(order);
    });
});

module.exports = router;
