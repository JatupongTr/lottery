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
  Agent.findById(req.params.id).then((agent) => {
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
