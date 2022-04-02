const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        clubId: {
            type: String,
            required: true
        },
        courseId: {
            type: String,
            required: true
        },
        intensite: {
            type: Number,
            required: true
        },
        invitMsg: {
            type: String,
        },
        placeLimit: {
            type: Number,
        },
        placeListAttend: {
            type: Number,
        },
        dateBegin: {
            type: Date,
        },

    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Event", EventSchema);