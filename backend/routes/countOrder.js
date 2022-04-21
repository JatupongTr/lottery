const express = require("express");
const Order = require("../models/order");

const router = express.Router();

router.get("", (req, res, next) => {
    Order.find().then((documents) => {
      res.status(200).json({
        message: "Order fetched successfully",
        orders: documents,
      });
    });
  });

module.exports = router;
