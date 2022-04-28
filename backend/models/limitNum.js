const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const limitNumberSchema = new Schema({
    limitPrice: {type: Number },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    }
});


module.exports = mongoose.model("Limit", limitNumberSchema);
