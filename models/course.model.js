const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        tubeLink: {
            type: String,
        },
        duration: {
            type: Number,
            required: true
        },
        calories: {
            type: Number,
            required: true
        },
        picture: {
            type: String,
        },
        desc: {
            type: String,
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Course", CourseSchema);