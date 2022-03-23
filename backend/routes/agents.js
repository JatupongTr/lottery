const express = require("express");

const Agent = require("../models/agent");

const router = express.Router();

router.post("", (req, res, next) => {
  const newAgent = new Agent({
    code: req.body.code,
    name: req.body.name,
    imagePath: req.body.imagePath,
  });
  newAgent.save().then((createAgent) => {
    res.status(201).json({
      newAgent: {
        ...createAgent,
        id: createAgent._id,
      },
    });
  });
});

router.get("", (req, res, next) => {
  Agent.find().then((documents) => {
    res.status(200).json({
      message: "Agent fetched successfully",
      agents: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
  Agent.findById(req.params.id)
    // .populate("order.items.category")
    .then((agent) => {
      if (agent) {
        res.status(200).json(agent);
      } else {
        res.status(404).json({ message: "Agent not Found" });
      }
    });
});

router.put("/:id", (req, res, next) => {
  const agent = new Agent({
    _id: req.body.id,
    code: req.body.code,
    name: req.body.name,
    imagePath: req.body.imagePath,
  });
  Agent.updateOne({ _id: req.params.id }, agent).then((result) => {
    res.status(200).json({ message: "Updated successfully" });
  });
});

router.post("/order/:id", (req, res, next) => {
  let items = [];
  for (let i = 0; i < req.body.length; i++) {
    let item = {
      lotto_no: req.body[i].lotto_no,
      price: req.body[i].price,
      discount: req.body[i].discount,
      net_price: req.body[i].net_price,
      category: req.body[i].category,
    };
    items.push(item);
  }
  Agent.findOne({ _id: req.params.id }).then((agent) => {
    agent.order.items.push(...items);
    agent.save().then((item) => {
      res.status(200).json({
        message: "Create order",
      });
    });
  });
});

// remove order items
// router.post("/order/remove/:id", (req, res, next) => {
//   const itemId = req.body.id;
//   Agent.findOne({ _id: req.params.id }).then((agent) => {
//     agent.order.items.pull(itemId);
//     agent.save().then((item) => {
//       res.status(200).json({
//         message: "Items Deleted",
//       });
//     });
//   });
// });

// summary
// router.post("/order/total/:id", (req, res, next) => {
//   Agent.aggregate([
//     {
//       $match: {
//         _id: req.params.id,
//       },
//     },
//     {
//       $group: {
//         _id: "$items",
//         total: {
//           $sum: "$net_price"
//         }
//       }
//     }
//   ]).catch(err => {
//   })
// });

router.delete("/:id", (req, res, next) => {
  Agent.deleteOne({ _id: req.params.id })
    .then((resutl) => {
      res.status(200).json({
        message: "Agent Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
