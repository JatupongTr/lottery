const Order = require("../models/order");

exports.countOrder = (req, res, next) => {
  Order.find().then((documents) => {
    res.status(200).json({
      message: "Order fetched successfully",
      orders: documents,
    });
  });
}
