const express = require("express");
const router = express.Router();

const Notification = require("../models/notification");

router.get("", (req, res, next) => {
  Notification.find()
    .sort({ _id: -1 })
    .then((result) => {
      res.status(200).json(result);
    });
});

router.get("/new", (req, res, next) => {
  Notification.find()
    .where({ read: false })
    .then((result) => {
      res.status(200).json(result);
    });
});

router.get("/read", (req, res, next) => {
  Notification.updateMany({ read: false }, { $set: { read: true } }).then(
    (result) => {
      res.status(200).json({ message: "Notification Read" });
    }
  );
});

router.delete('', (req, res, next) => {
  Notification.deleteMany({ read: true }).then(result => {
    res.status(200).json({messate: "Notifications are clear"})
  })
})
module.exports = router;
