const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "User not found!",
        });
      }
      const token = jwt.sign(
        {
          username: fetchedUser.username,
          userId: fetchedUser._id,
        },
        "secret_this_should_be_longer"
      );
      res.status(200).json({
        token: token,
        fetchedUser
      });
    })
    .catch((err) => {
      return res.end()
    });
});

module.exports = router;
