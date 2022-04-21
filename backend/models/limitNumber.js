const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const limitNumberSchema = new Schema({
    limitNumber: { type: String },
    typeNumber: { type: String }
});


module.exports = mongoose.model("LimitNumber", limitNumberSchema);
