const Agent = require("../models/agent");
const Notification = require("../models/notification");

function incrementCode(nextAgentCode) {
  let increasedNum = Number(nextAgentCode.replace("A", "")) + 1;
  let kmsStr = nextAgentCode.substr(0, 1);
  for (let i = 0; i < 4 - increasedNum.toString().length; i++) {
    kmsStr = kmsStr + "0";
  }
  return (kmsStr = kmsStr + increasedNum.toString());
}

exports.createAgent = (req, res, next) => {
  Agent.find()
    .sort({ code: -1 })
    .limit(1)
    .then((data) => {
      if (data.length == 0) {
        const newAgent = new Agent({
          code: "A0001",
          name: req.body.name,
          imagePath: req.body.imagePath,
        });
        newAgent.save().then(() => {
          let newNoti = new Notification({
            title: "เพิ่มตัวแทน ",
            message:
              "รหัสตัวแทน: " + newAgent.code + " " + " ชื่อ: " + newAgent.name,
          });
          newNoti.save().then(() => {
            res.status(201).json({ meaaget: "agent added" });
          });
        });
      } else {
        const newAgent = new Agent({
          code: incrementCode(data[0].code),
          name: req.body.name,
          imagePath: req.body.imagePath,
        });
        newAgent.save().then(() => {
          let newNoti = new Notification({
            title: "เพิ่มตัวแทน ",
            message:
              "รหัสตัวแทน: " + newAgent.code + " " + " ชื่อ: " + newAgent.name,
          });
          newNoti.save().then(() => {
            res.status(201).json({ meaaget: "agent added" });
          });
        });
      }
    });
};

exports.findAgent = (req, res, next) => {
  Agent.find()
    .then((documents) => {
      res.status(200).json({
        message: "Agent fetched successfully",
        agents: documents,
      });
    });
};

exports.findNewAgent = (req, res, next) => {
  Agent.find()
    .limit(5)
    .then((documents) => {
      res.status(200).json({
        message: "Agent fetched successfully",
        agents: documents,
      });
    });
};

exports.findAgentById = (req, res, next) => {
  Agent.findById(req.params.id)
    // .populate("order.items.category")
    .then((agent) => {
      if (agent) {
        res.status(200).json(agent);
      } else {
        res.status(404).json({ message: "Agent not Found" });
      }
    });
};

exports.updateAgent = (req, res, next) => {
  const agent = new Agent({
    _id: req.body.id,
    code: req.body.code,
    name: req.body.name,
    imagePath: req.body.imagePath,
  });
  Agent.updateOne({ _id: req.params.id }, agent).then((result) => {
    res.status(200).json({ message: "Updated successfully" });
  });
};

exports.removeAgent = (req, res, next) => {
  Agent.deleteOne({ _id: req.params.id })
    .then((resutl) => {
      res.status(200).json({
        message: "Agent Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
