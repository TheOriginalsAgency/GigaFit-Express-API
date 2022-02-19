const mongoose = require("mongoose");
const NotificationSchema = mongoose.Schema(
    {
        clubname:{
            type: String,
            require:true
        },
        discription:{
            type: String,
            require: true
        },
        date:{
            type: Date,
            require: true
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Notification', NotificationSchema);