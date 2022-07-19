const Notification = require("../models/notification");

exports.getNotifications = (req, res, next) => {
  Notification.find()
    .sort({ _id: -1 })
    .then((result) => {
      res.status(200).json(result);
    });
}

exports.getNewNotification = (req, res, next) => {
  Notification.find()
    .where({ read: false })
    .then((result) => {
      res.status(200).json(result);
    });
}

exports.readNotification = (req, res, next) => {
  Notification.updateMany({ read: false }, { $set: { read: true } }).then(
    (result) => {
      res.status(200).json({ message: "Notification Read" });
    }
  );
}

exports.clearNotification = (req, res, next) => {
  Notification.deleteMany({ read: true }).then(result => {
    res.status(200).json({messate: "Notifications are clear"})
  })
}
