const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    toddThreeDigits: { type: Number },
    topThreeDigits: { type: Number },
    downThreeDigits: { type: Number },    
    firstThreeDigits: { type: Number },
    lastThreeDigits: { type: Number },
    topTwoDigits: { type: Number },
    downTwoDigits: { type: Number },
    topRunDigits: { type: Number },
    downRunDigits: { type: Number }
});


module.exports = mongoose.model("Settings", settingsSchema);
