const mongoose = require("mongoose");

const RepititionSchema = mongoose.Schema(
    {
        num: {
            type: Number,
            require: true,
        },
        mesure: {
            type: Number,
            require: true,
        },
        counter: {
            type: Number,
            require: true
        },
        counter_rest: {
            type: Number,
            require: true
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Repitition', RepititionSchema);