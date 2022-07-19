const express = require("express");
const rewardController = require('../controllers/reward')
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, rewardController.checkReward);

module.exports = router;
