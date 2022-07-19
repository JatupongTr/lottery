const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const categoryController = require("../controllers/category");

// add halfPay lists
router.post("/halfPay", checkAuth, categoryController.createHalfPay);
// reset
router.put("/reset", checkAuth, categoryController.resetCategory);
//remove halfPay
router.post("/remove/:id", checkAuth, categoryController.removeHalfPay);
// clear เลขอั้น
router.put("/clear", checkAuth, categoryController.clearHalfPay);
router.get("", checkAuth, categoryController.getCategories);
router.get("/halfpay", checkAuth, categoryController.getHalfPay);
router.post("", checkAuth, categoryController.createCategory);
router.get("/two", checkAuth, categoryController.getTwoDigits);
router.get("/running", checkAuth, categoryController.getRunningDigits);
router.get("/three", checkAuth, categoryController.getThreeDigits);
router.get("/:id", checkAuth, categoryController.getCategoryById);
// เลขตัวคูณ
router.put("/rewardPrice/:id", checkAuth, categoryController.updateRewardPrice);
// เลขค่าเก็บ
router.put(
  "/purchaseMaximum/:id",
  checkAuth,
  categoryController.updatePurchaseMax
);

module.exports = router;
