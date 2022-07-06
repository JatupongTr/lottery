const express = require("express");
const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth,(req, res, next) => {
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
    .unwind("items.categoryId")
    .match({
      $and: [
        { period: period },
        {
          $or: [
            {
              "items.categoryId.cate_id": { $eq: "topTwoDigits" },
              "items.lottoNo": { $eq: sliceFirstPrize },
            },
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
      totalRewards: {
        $switch: {
          branches: [
            // 2 ตัวบน
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "topTwoDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "topTwoDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // 2 ตัวล่าง
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "downTwoDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "downTwoDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // วิ่งบน
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "topRunDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "topRunDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // วิ่งล่าง
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "downRunDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "downRunDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // 3 ตัวบน
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "topThreeDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "topThreeDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // โต๊ด
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "toddThreeDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "toddThreeDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // 3 ตัวหน้า
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "firstThreeDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "firstThreeDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // 3 ตัวท้าย
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "lastThreeDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "lastThreeDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
            // 3 ตัวล่าง
            {
              case: {
                $and: [
                  { $eq: ["$items.categoryId.cate_id", "downThreeDigits"] },
                  {
                    $in: [
                      "$items.lottoNo",
                      "$items.categoryId.halfPay.lottoNo",
                    ],
                  },
                ],
              },
              then: {
                $multiply: ["$items.price", "$items.categoryId.halfPayReward"],
              },
            },
            {
              case: { $eq: ["$items.categoryId.cate_id", "downThreeDigits"] },
              then: {
                $multiply: ["$items.price", "$items.categoryId.rewardPrice"],
              },
            },
          ],
          default: 0,
        },
      },
    })

    .unwind("$agentId")
    .group({
      _id: { customer: "$customer", agent: "$agentId" },
      lists: { $push: "$$ROOT" },
      totals: { $sum: "$totalRewards" },
    })
    .sort({ "_id.agent.code": 1 })
    .then((order) => {
      res.status(200).json(order);
    });
});

module.exports = router;
