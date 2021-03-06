const moment = require("moment");
const Order = require("../models/order");

exports.reportIncome = (req, res, next) => {
  let start = moment().startOf("year").format("YYYY-MM-DD");
  let end = moment().endOf("year").format("YYYY-MM-DD");

  Order.aggregate()
    .unwind("items")
    .match({
      period: { $gte: start, $lt: end },
    })
    .project({
      _id: 0,
      period: 1,
      customer: 1,
      createdAt: 1,
      agentId: 1,
      items: {
        lottoNo: 1,
        price: 1,
        discount: 1,
        netPrice: 1,
        categoryId: 1,
      },
    })
    .group({
      _id: { $substr: ["$period", 5, 2] },
      totals: { $sum: "$items.netPrice" },
    })
    .sort({ _id: 1 })
    .then((result) => {
      res.status(200).json(result);
    });
}

exports.reportPopular = (req, res, next) => {
  Order.aggregate()
    .unwind("items")
    // .match({
    //   "items.netPrice": { $ne: 0 },
    // })
    .group({
      _id: "$period",
      dataSet: {
        $push: "$items.lottoNo",
      },
    })
    .sort({ _id: -1 })
    .limit(1)
    .unwind("dataSet")
    .group({
      _id: "$dataSet",
      count: { $sum: 1 },
    })
    .sort({ count: -1 })
    .limit(3)
    .then((result) => {
      res.status(200).json(result);
    });
}
