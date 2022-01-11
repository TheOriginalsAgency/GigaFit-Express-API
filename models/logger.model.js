const mongoose = require("mongoose");

const LoggerSchema = mongoose.Schema(
    {
        id_user: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['LogIn','LogOut']
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            require: true,
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);
module.exports = mongoose.model('Logger', LoggerSchema);