const { number } = require("joi");
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
        type: String,
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
      default: "noAvatar.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
    weight: {
      type: Number,
      default : 0
    },
    height: {
      type: Number,
      default : 0
    },
    imc: {
      type: String,
      default : ''
    },
    clubs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);