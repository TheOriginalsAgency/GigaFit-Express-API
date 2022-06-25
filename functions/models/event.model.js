const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
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
        dateEnd: {
            type: Date,
        },
        salle: {
            type: String,
        },
        coach: {
            type: String,
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Event", EventSchema);