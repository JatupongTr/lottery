const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  cate_id: { type: String },
  cate_name: { type: String },
  description: { type: String },
  rewardPrice: { type: Number },
  purchaseMaximum: { type: Number }, // กำหนดยอดซื้อสูงสุด
  purchaseAmount: { type: Number }, // ยอดซื้อทั้งหมด
  purchaseBalance: { type: Number } // ยอดซื้อ - ยอดขาย = ยอดซื้อคงเหลือ
});

module.exports = mongoose.model("Category", categorySchema);
