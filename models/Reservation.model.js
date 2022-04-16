const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
        eventIds: {
            type: Array,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Reservation", ReservationSchema);