const express = require("express");
const router = express.Router();

const Agent = require("../models/agent");
const Notification = require("../models/notification")
const checkAuth = require('../middleware/check-auth')

function incrementCode(nextAgentCode) {
  let increasedNum = Number(nextAgentCode.replace("A", "")) + 1;
  let kmsStr = nextAgentCode.substr(0, 1);
  for (let i = 0; i < 4 - increasedNum.toString().length; i++) {
    kmsStr = kmsStr + "0";
  }
 return kmsStr = kmsStr + increasedNum.toString();

}

router.post("", checkAuth,(req, res, next) => {
  Agent.find()
    .sort({ code: -1 })
    .limit(1)
    .then((data) => {
      if (data) {
        lastAgentCode = data[0].code;
        const newAgent = new Agent({
          code: incrementCode(data[0].code),
          name: req.body.name,
          imagePath: req.body.imagePath
        })
        newAgent.save().then(() => {
          let newNoti = new Notification({
            title: "เพิ่มตัวแทนใหม่ " ,
            message: "รหัสตัวแทน: " + newAgent.code + " ชื่อ: " + newAgent.name
          })
          newNoti.save().then(() => {
            res.status(201).json({meaaget: "agent added"})
          })
        })
      }
    });
});

router.get("", checkAuth,(req, res, next) => {
  Agent.find()
  .skip(1)
  .then((documents) => {
    res.status(200).json({
      message: "Agent fetched successfully",
      agents: documents,
    });
  });
});

router.get("/new", checkAuth,(req, res, next) => {
  Agent.find()
  .sort({ code: -1 })
  .limit(5)
  .then((documents) => {
    res.status(200).json({
      message: "Agent fetched successfully",
      agents: documents,
    });
  });
});

router.get("/:id", checkAuth,(req, res, next) => {
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

router.put("/:id", checkAuth,(req, res, next) => {
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

router.delete("/:id", checkAuth,(req, res, next) => {
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
