const mongoose = require("mongoose");
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

const agentSchema = new Schema(
  {
    code: { type: String, required: true, uppercase: true, maxlength: 5, minlength: 5 },
    name: { type: String, required: true },
    imagePath: { type: String, required: true }, // add default image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
