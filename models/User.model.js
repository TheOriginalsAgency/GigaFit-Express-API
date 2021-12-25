const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    lastname: {
        type: String,
        require: true,
        max: 10,
    },
    firstname: {
        type: String,
        require: true,
        max: 10,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        require: true,
    },
    dateBirth: {
        type: Date,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    tel: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profilePicture: {
      type: String,
      default: "../public/images/noAvatar.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
    clubs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);