const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const dotenv = require("dotenv");
var cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const userfunctions = require("./routes/user.route.js");
const clubfunctions = require("./routes/club.route");
const programfunctions = require("./routes/program.route");
const sessionfunctions = require("./routes/session.route");
const notifications = require("./routes/pushNotifications.route");
const adminFunctions = require("./routes/admin.route");
const superAdminFunctions = require("./routes/superAdmin.route");
const programHistoryFunctions = require("./routes/history.route");
const resamaniaGigaFunctions = require("./routes/resamania.route");
const notificationFunction = require("./routes/notification.route");
const courseFunctions = require('./routes/course.route')
const eventFunctions = require('./routes/event.route')
const { forgetPassword } = require("./controllers/User.controller");
const jwt = require("jsonwebtoken");

var fs = require("fs");

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB...");
  }
);

app.get("/", (req, res) => {
  res.send("Hello From GigaFit API");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.post("/user/forgotPassword/:email", forgetPassword);
//middleware
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.options("*", cors());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION");
  next();
});

app.use(globelmiddlewire);

//globelmiddlewire

function globelmiddlewire(req, res, next) {
  var auth = req.headers["authorization"];
  if (
    req.url === "/api/user/login" ||
    req.url === "/api/user/registration" ||
    req.url === "/api/super-admin/login"
  )
    return next();
  const token = auth && auth.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

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

app.post("/api/uploadProgram", uploadProgram.single("file"), (req, res) => {
  try {
    return res.status(200).json("Program File uploded successfully");
  } catch (error) {
    console.error("UploadProgram ERROR !!" + error);
  }
});

app.post(
  "/api/updateProgram/:nameFile",
  uploadProgram.single("file"),
  (req, res) => {
    try {
      fs.unlinkSync(`public/images/programs/${req.params.nameFile}`);
      return res.status(200).json("Program File uploded successfully");
    } catch (error) {
      console.error("UploadProgram ERROR !!" + error);
    }
  }
);

//images Sessions uploads
const storageSessions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/sessions");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadSessions = multer({ storage: storageSessions });

app.post("/api/postSession", uploadSessions.single("file"), (req, res) => {
  try {
    return res.status(200).json("Session File uploded successfully");
  } catch (error) {
    console.error("UploadSession ERROR !!" + error);
  }
});

//Upload session image
app.post(
  "/api/uploadSession/:nameFile",
  uploadSessions.single("file"),
  (req, res) => {
    try {
      fs.unlinkSync(`public/images/sessions/${req.params.nameFile}`);
      return res.status(200).json("Session File updated successfully");
    } catch (error) {
      console.error("UploadSession ERROR !!" + error);
    }
  }
);

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
app.post(
  "/api/updateUser/:nameFile",
  uploadUsers.single("file"),
  (req, res) => {
    try {
      if (req.params.nameFile === "noAvatar.png") {
        return res.status(200).json("Users File updated successfully");
      } else {
        fs.unlinkSync(`public/images/users/${req.params.nameFile}`);
        return res.status(200).json("Users File updated successfully");
      }
    } catch (error) {
      console.error("UploadUser ERROR !!" + error);
    }
  }
);

// Update club image
const storageClubs = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/clubs");
  },
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, req.body.name);
  },
});

const uploadClubs = multer({ storage: storageClubs });
app.post(
  "/api/updateClubs/:nameFile",
  uploadClubs.single("file"),
  (req, res) => {
    // try {
    //   fs.unlinkSync(`public/images/clubs/${req.params.nameFile}`);
    //   return res.status(200).json("Program File uploded successfully");
    // } catch (error) {
    //   console.error('UploadProgram ERROR !!'+error);
    // }
    return res.status(200).json("Program File uploded successfully");
  }
);

// upload admins image
const storageAdmin = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/admins");
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(file.name);
    cb(null, req.body.name);
  },
});

const uploadAdmins = multer({ storage: storageAdmin });
app.post("/api/imgAdmins", uploadAdmins.single("file"), (req, res) => {
  return res.status(200).json("Program File uploded successfully");
});

//routes
app.use("/api", userfunctions);
app.use("/api", clubfunctions);
app.use("/api", programfunctions);
app.use("/api", sessionfunctions);
app.use("/api", notifications);
app.use("/api", adminFunctions);
app.use("/api", superAdminFunctions);
app.use("/api", programHistoryFunctions);
app.use("/api", resamaniaGigaFunctions);
app.use("/api", notificationFunction);
app.use("/api", courseFunctions);
app.use("/api", eventFunctions);

app.listen(process.env.PORT, () => {
  console.log(`Backend API server is running on port ${process.env.PORT} !`);
});
