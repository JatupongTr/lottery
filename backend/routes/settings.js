const express = require("express");
const Settings = require("../models/settings");
const router = express.Router();

router.post("", (req, res, next) => {
  let keepPrices = new Settings({
    toddThree: req.body.toddThree,
    topThree: req.body.topThree,
    downThree: req.body.downThree,
    firstThree: req.body.firstThree,
    lastThree: req.body.lastThree,
    topTwo: req.body.topTwo,
    downTwo: req.body.downTwo,
    topRunning: req.body.topRunning,
    downRunning: req.body.downRunning,
  });  

  keepPrices.save().then((settings) => {
    res.status(201).json({
      message: "set up successfully",
      settings
    });
  });
});

router.get("", (req, res, next) => {
  Settings.find().then((documents) => {
    res.status(200).json({
      message: "Settings fetched successfully",
      settingss: documents,
    });
  });
});

router.delete("", (req, res, next) => {
  Settings.deleteMany()
    .then((resutl) => {
      res.status(200).json({
        message: "Settings Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
