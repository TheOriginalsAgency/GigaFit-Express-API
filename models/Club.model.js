const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
    {
        resId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        eventLink: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            default: ""
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Club", ClubSchema);