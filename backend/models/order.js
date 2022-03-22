const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  lottoNo: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  netPrice: { type: Number, required: true },
  categoryId: {
    type: Object,
    ref: "Category",
  },
});
const orderSchema = new Schema(
  {
    orderDate: { type: String, required: true },
    items: [itemSchema],
    total: { type: Number, default: 0 },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
