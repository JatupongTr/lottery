const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const agentsRoutes = require("./routes/agents");
const usersRoutes = require("./routes/users");
const cateRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const rewardRoutes = require('./routes/rewards')
const countRoutes = require("./routes/countOrder");
const reportRoutes = require('./routes/reports');
const notificationRoutes = require('./routes/notifications')


const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:"+ process.env.MONGO_ATLAS_PW +"@cluster0.afesf.mongodb.net/lottery?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connected failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/agents", agentsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", cateRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/count_orders", countRoutes);
app.use('/api/reports', reportRoutes)
app.use('/api/rewards', rewardRoutes);
app.use('/api/notifications', notificationRoutes)

module.exports = app;
