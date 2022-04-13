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
<<<<<<< HEAD
=======
        club: {
            type: String,
        },
>>>>>>> 9fbea6eadcb6333e57a437ccbe6682848e9716c5
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Course", CourseSchema);