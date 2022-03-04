const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  list_no: {type: String, required: true },
  price: { type: Number, required: true },
  disocunt: { type: Number },
  category: {type: String}
})

const agentSchema = mongoose.Schema({
  code: { type: String, required: true, uppercase: true },
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  itemLists: [listSchema]
});

module.exports = mongoose.model("Agent", agentSchema);
