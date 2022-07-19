const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const reportController = require('../controllers/report')

router.get("/income", checkAuth, reportController.reportIncome);

router.get("/populars", checkAuth, reportController.reportPopular);

module.exports = router;
