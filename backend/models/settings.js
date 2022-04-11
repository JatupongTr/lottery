const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    toddThree: { type: Number },
    topThree: { type: Number },
    downThree: { type: Number },    
    firstThree: { type: Number },
    lastThree: { type: Number },
    topTwo: { type: Number },
    downTwo: { type: Number },
    topRunning: { type: Number },
    downRunning: { type: Number }
});


module.exports = mongoose.model("Settings", settingsSchema);
