const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  lottoNo: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  netPrice: { type: Number, required: true },
  overPrice: { type: Boolean, default: false },
  cutPrice: { type: Number, default: 0},
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});
const orderSchema = new Schema(
  {
    customer: { type: String, required: true },
    period: { type: String, required: true },
    items: [itemSchema],
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
    },
  },
  { timestamps: true }
);

orderSchema.index({ period: "text" });

module.exports = mongoose.model("Order", orderSchema);
