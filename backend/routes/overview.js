const express = require("express");
const router = express.Router();
const overview = require("../models/overview");
const Agent = require("../models/agent");

router.get("", (req, res, next) => {
    Agent.find().then((documents) => {
        res.status(200).json({
        message: "Agent fetched successfully",
        agents: documents,
        });
    });
});

module.exports = router;