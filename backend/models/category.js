const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  cate_id: { type: String },
  cate_name: { type: String },
  description: { type: String }
})

module.exports = mongoose.model('Category', categorySchema)
