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
        },
        adresse: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        siteWeb: {
            type: String,
        },
        tel: {
            type: String,
        },
        email: {
            type: String,
        },
        studios: {
            type: Array,
        },
        coaches: {
            type: Array,
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Club", ClubSchema);