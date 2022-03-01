const mongoose = require("mongoose");
const program = require("./Program.model");

const SessionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
            default: 'defaultSession.jpeg'
        },
        programs: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male','Female','Both']
        },
        belong: {
            type: String,
            enum: ['user', 'app'],
            default: 'app'
        },
        user: {
            type: String,
            default: null
        }

    },
    { 
        timestamps: true,
        versionKey: false
    }
);
module.exports = mongoose.model('Session', SessionSchema);