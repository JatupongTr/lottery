const express = require("express");
const router = express.Router();
const notiController = require("../controllers/notification");

router.get("", notiController.getNotifications);
router.get("/new", notiController.getNewNotification);
router.get("/read", notiController.readNotification);
router.delete("", notiController.clearNotification);

module.exports = router;
