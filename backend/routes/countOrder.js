const express = require("express");
const orderController = require("../controllers/countOrder")

const router = express.Router();

router.get("", orderController.countOrder);

module.exports = router;
