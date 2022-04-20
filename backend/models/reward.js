const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  rewardPeriod: { type: String, required: true },
  firstPrize: { type: String, required: true },
  lastThreePrize1: { type: String, required: true },
  lastThreePrize2: { type: String, required: true },
  firstThreePrize1: { type: String, required: true },
  firstThreePrize2: { type: String, required: true },
  downTwoPrize: { type: String, required: true },
});

module.exports = mongoose.model("Reward", rewardSchema);
