const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    title: { type: String },
    message: {type: String},
    date: { type: Date, default: Date.now()},
    read: { type: Boolean, default: false }
  },
)

module.exports = mongoose.model('Notification', notificationSchema)
