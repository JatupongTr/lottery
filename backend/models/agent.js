const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const agentSchema = new Schema(
  {
    code: { type: String, required: true, uppercase: true },
    name: { type: String, required: true },
    imagePath: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
