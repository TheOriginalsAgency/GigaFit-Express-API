const mongoose = require("mongoose");
const repitition = require("./Repitition.model");

const HistorySchema = mongoose.Schema(
    {
        repititions: [repitition],
        program: {
            type: ObjectId,
            ref: "Program" 
        },
        user: {
            type: ObjectId,
            ref: "User" 
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('History', HistorySchema);