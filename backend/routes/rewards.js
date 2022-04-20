const express = require("express");
const Order = require("../models/order");

const router = express.Router();

router.post("", (req, res, next) => {
  const period = req.body.period;
  const firstPrize = req.body.firstPrize;
  const downTwoPrize = req.body.downTwoPrize;
  const lastThreePrize1 = req.body.lastThreePrize1;
  const lastThreePrize2 = req.body.lastThreePrize2;
  const firstThreePrize1 = req.body.firstThreePrize1;
  const firstThreePrize2 = req.body.firstThreePrize2;

  const sliceFirstPrize = firstPrize.slice(-2);
  const sliceTopThree = firstPrize.slice(-3);

  const arrSplit = [...downTwoPrize]
  const arrSplitTop = [...sliceFirstPrize]
  const arrLastThreePrize1 = [...lastThreePrize1]

   // เลขโต๊ด

  Order.aggregate()
    .match({
      period: period,
    })
    .unwind("items")
    .lookup({
      from: "agents",
      localField: "agentId",
      foreignField: "_id",
      as: "agent",
    })
    .project({
      _id: 0,
      period: 1,
      customer: 1,
      createdAt:1,
      agent: {
        code: 1,
        name: 1,
      },
      items: 1,
    })
    .match({
      $and: [
        {
          $or: [
            {
              "items.categoryId.cate_id": { $eq: "downTwoDigits" },
              "items.lottoNo": { $eq: downTwoPrize },
            },
            {
              "items.categoryId.cate_id": { $eq: "lastThreeDigits" },
              "items.lottoNo": { $eq: lastThreePrize1 },
            },
            {
              "items.categoryId.cate_id": { $eq: "lastThreeDigits" },
              "items.lottoNo": { $eq: lastThreePrize2 },
            },
            {
              "items.categoryId.cate_id": { $eq: "firstThreeDigits" },
              "items.lottoNo": { $eq: firstThreePrize1 },
            },
            {
              "items.categoryId.cate_id": { $eq: "firstThreeDigits" },
              "items.lottoNo": { $eq: firstThreePrize2 },
            },
            {
              "items.categoryId.cate_id": { $eq: "topTwoDigits" },
              "items.lottoNo": { $eq: sliceFirstPrize },
            },
            {
              "items.categoryId.cate_id": { $eq: "topThreeDigits"},
              "items.lottoNo": { $eq: sliceTopThree }
            },
            {
              "items.categoryId.cate_id": { $eq: "downRunDigits"},
              "items.lottoNo": { $in: arrSplit}
            },
            {
              "items.categoryId.cate_id": { $eq: "topRunDigits"},
              "items.lottoNo": { $in: arrSplitTop}
            },
            //todd
          ],
        },
      ],
    })
    .group({ _id: "$agent.code", lists: { $push: "$$ROOT" } })
    .sort({ agent: 1 })
    .then((order) => {
      console.log(arrLastThreePrize1)
      res.status(200).json(order);
    });
});


module.exports = router;
