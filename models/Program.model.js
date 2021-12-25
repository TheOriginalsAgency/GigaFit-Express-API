const mongoose = require("mongoose");

const ProgramSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        require: true,
        min: 10,
        max: 30,
        unique: false,
    },
    picture: {
        type: String,
        required: true,
        default: "http://192.168.1.6:2022/images/defaultProgram.png",
      },
    video: {
      type: String,
      required: true,
      default: "",
    },
    bodypart: {
      type: String,
      enum: ['Abdos','Abducteur','Adducteur','Avant-bras','Biceps','Dos',
      'Épaules','Fessier','Ischio-jambier','Lombaire','Mollet','Oblique','Pectoraux','Quadriceps','Trapeze','Triceps',null],
      default: null
    },
    how: {
      type: String,
      required: true,
    },
    why: {
      type: String,
      required: true,
    },
    history: {
      type: Boolean,
      required: true,
      default: false
    },
    categorie: {
        type: String,
        required: true,
        enum: ['Musculation', 'Cardio'],
    },
    worktype: {
        type: String,
        enum: ['Éxercice','Étirement', null],
        default: null,
    },
    clubs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Program", ProgramSchema);