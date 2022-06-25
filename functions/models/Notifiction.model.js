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
        destination:{
            type: String,
            require: true,
            enum: ['allUsers', 'Males', 'Females']
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('Notification', NotificationSchema);