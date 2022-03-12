const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lottoSchema = new Schema({
  lotto_no: { type: String },
  price: { type: Number },
  discount: { type: Number },
  net_price: { type: Number },
  cate_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

module.exports = mongoose.model('Lotto', lottoSchema)
