const mongoose = require("mongoose");
const repitition = require("./Repitition.model");

const HistorySchema = mongoose.Schema(
    {
        program: {
            type: String,
            require: true
        },
        user: {
            type: String,
            require: true
        },
        repitition: {
            type: Array,
            require: true
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('History', HistorySchema);