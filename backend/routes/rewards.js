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

  const arrSplit = [...downTwoPrize];
  const arrSplitTop = [...sliceFirstPrize];

  // เลขโต๊ด
  const stringPermutations = (str) => {
    if (str.length <= 2)
      return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str
      .split("")
      .reduce(
        (acc, letter, i) =>
          acc.concat(
            stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
              (val) => letter + val
            )
          ),
        []
      );
  };

  Order.aggregate()
    .unwind({
      path: "$items",
      preserveNullAndEmptyArrays: true,
    })
    .match({
      $and: [
        { period: period },
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
              "items.categoryId.cate_id": { $eq: "topThreeDigits" },
              "items.lottoNo": { $eq: sliceTopThree },
            },
            {
              "items.categoryId.cate_id": { $eq: "downRunDigits" },
              "items.lottoNo": { $in: arrSplit },
            },
            {
              "items.categoryId.cate_id": { $eq: "topRunDigits" },
              "items.lottoNo": { $in: arrSplitTop },
            },
            //todd
            {
              "items.categoryId.cate_id": { $eq: "toddThreeDigits" },
              "items.lottoNo": { $in: stringPermutations(lastThreePrize1) },
            },
            {
              "items.categoryId.cate_id": { $eq: "toddThreeDigits" },
              "items.lottoNo": { $in: stringPermutations(lastThreePrize2) },
            },
            {
              "items.categoryId.cate_id": { $eq: "toddThreeDigits" },
              "items.lottoNo": { $in: stringPermutations(firstThreePrize1) },
            },
            {
              "items.categoryId.cate_id": { $eq: "toddThreeDigits" },
              "items.lottoNo": { $in: stringPermutations(firstThreePrize2) },
            },
          ],
        },
      ],
    })
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
      createdAt: 1,
      agent: 1,
      items: 1,
      totalRewards: {
        // $multiply: ["$items.price", 70]
        $cond: {
          if: {
            $eq: ["$items.categoryId.cate_id", "downTwoDigits"]
          },
          then: {
            $multiply: ["$items.price", 70]
          },
          else: "no Reward"
        }
      },
    })
    .unwind("$agent")
    .group({
      _id: { customer: "$customer", agent: "$agent" },
      lists: { $push: "$$ROOT" },
    })
    .sort({ "_id.agent.code": 1 })
    .then((order) => {
      res.status(200).json(order);
    });
});

module.exports = router;
