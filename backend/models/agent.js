const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lottoSchema = new Schema({
  lotto_no: { type: String },
  price: { type: Number },
  discount: { type: Number },
  net_price: { type: Number },
  cate_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const agentSchema = new Schema(
  {
    code: { type: String, required: true, uppercase: true },
    name: { type: String, required: true },
    imagePath: { type: String, required: true },
    order: {
      items: [lottoSchema, { timestamps: true }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
