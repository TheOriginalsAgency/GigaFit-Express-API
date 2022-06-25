const mongoose = require("mongoose");

const LoggerSchema = mongoose.Schema(
    {
        id_user: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ['LogIn','LogIn-Admin','LogIn-superAdmin','LogOut']
        },
        gender: {
            type: String,
            enum: ['Male', 'Female'],
            require: true,
        },
        dateLog: {
            type: String,
            require: true,
        }
    },
    { 
        timestamps: true,
        versionKey: false
    }
);
module.exports = mongoose.model('Logger', LoggerSchema);