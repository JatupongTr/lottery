const express = require("express");
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/order");

const router = express.Router();

// create order
router.post("/:id", checkAuth, orderController.createOrder);
router.get("/totals/:agentId/:period", checkAuth, orderController.getOrder);
router.post("/remove/:id", checkAuth, orderController.removeItem);
// get overPrice
router.post("/overPrice/check", checkAuth, orderController.getOverPrice);
router.get("/:id", checkAuth, orderController.getOrderById);
router.get(
  "/total/category/:agentId/:period",
  checkAuth,
  orderController.getTotalByCategory
);
router.get("/total/:agentId/:period", checkAuth, orderController.getTotal);
router.get("", checkAuth, orderController.getOrders);
//check order
router.get("/check/:period", checkAuth, orderController.checkOrder);

module.exports = router;
