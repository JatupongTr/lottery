const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const agentsRoutes = require("./routes/agents");
const usersRoutes = require("./routes/users");
const cateRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const overviewsRoutes = require("./routes/overview");
const rewardRoutes = require('./routes/rewards')
const countRoutes = require("./routes/countOrder");
const settingsRoutes = require("./routes/settings");
const limitNumberRoutes = require("./routes/limitNumber");

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:admin123456@cluster0.afesf.mongodb.net/lottery?retryWrites=true&w=majority"
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
    "Origin, X-Requested-With, Content-Type, Accept"
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

app.use("/api/overviews", overviewsRoutes);
app.use("/api/count_orders", countRoutes);

app.use("/api/settings", settingsRoutes);

app.use("/api/limit", limitNumberRoutes);


app.use('/api/rewards', rewardRoutes)


module.exports = app;
