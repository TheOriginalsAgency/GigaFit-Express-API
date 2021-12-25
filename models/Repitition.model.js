const mongoose = require("mongoose");

const RepititionSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        mesure: {
            type: Number,
        }

    }
);

module.exports = mongoose.model('Repitition', RepititionSchema);