const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
var cors = require('cors')
const path = require("path");
const helmet = require("helmet");
const userfunctions = require('./routes/user.route.js');
const clubfunctions = require('./routes/club.route')
const programfunctions = require('./routes/program.route')
const sessionfunctions = require('./routes/session.route')

dotenv.config();


mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB...");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json({limit: '50mb'}));
app.use(helmet());
app.options('*', cors()) 
app.use(cors())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTION");
    next();
    })

//images Programs uploads
const storagePrograms = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/programs");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadProgram = multer({ storage: storagePrograms });
app.post("/api/uploadPrograms", uploadProgram.single("file"), (req, res) => {
  try {
    return res.status(200).json("Program File uploded successfully");
  } catch (error) {
    console.error('UploadProgram ERROR !!'+error);
  }
});
//images Users uploads
const storageUsers = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadUsers = multer({ storage: storageUsers });
app.post("/api/uploadUsers", uploadUsers.single("file"), (req, res) => {
  try {
    return res.status(200).json("Users File uploded successfully");
  } catch (error) {
    console.error('UploadUser ERROR !!'+ error);
  }
});

//routes
app.use('/api', userfunctions);
app.use('/api', clubfunctions);
app.use('/api', programfunctions);
app.use('/api', sessionfunctions);


app.listen(process.env.PORT, () => {
  console.log(`Backend API server is running on port ${process.env.PORT} !`);
});