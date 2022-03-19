const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lottoSchema = new Schema(
  {
    lotto_no: { type: String },
    price: { type: Number },
    discount: { type: Number },
    net_price: { type: Number },
    category: {
      type: Schema.Types.Mixed,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const agentSchema = new Schema(
  {
    code: { type: String, required: true, uppercase: true },
    name: { type: String, required: true },
    imagePath: { type: String, required: true },
    order: {
      items: [lottoSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
