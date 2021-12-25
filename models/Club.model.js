const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 10,
            max: 30,
        },
        picture: {
            type: String,
            required: true,
            default: ""
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Club", ClubSchema);