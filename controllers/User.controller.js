const User = require("../models/User.model");
const { RegisterValidation, LoginValidation } = require('../validations/authValidation');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { listen } = require("express/lib/application");

let globalToken;

const oneUser  = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
        !user && res.status(404).json("user not found");
 
        res.status(200).json(user)
  } catch (error) {
    
  }
}

const userRegistration = async (req, res) => {
    try {
      //Validation of Entered Values
      const {error} = RegisterValidation(req.body);
      if(error) return res.status(400).send('Validation Error : !!' + error.details[0].message);
      const salt = await bcrypt.genSalt(10);
      //generate new password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newUser = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
        dateBirth: req.body.dateBirth,
        password: hashedPassword,
      });
  
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);

    } catch (err) {
      res.status(500).json(err)
      console.log('My => '+ err);
    }
  }

  const userLogin = async (req, res) => {
    try {
      //Validation of Entered Values
        const {error} = LoginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        console.log(user);
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        const token = jwt.sign({user}, process.env.SECRET_KEY);
        console.log(token);
        // res.cookie("auth-token", token, {expire: new Date().setHours({hours: 3})})
        res.status(200).json({token, user})

      } catch (err) {
        res.status(500).json(err)
      }
  }
  const adminLogin = async (req, res) => {
    try {
      //Validation of Entered Values
        const {error} = LoginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");
        console.log(user);
        user.isAdmin == false && res.status(404).json("Login Failed or you not Admin");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")
    
        const token = jwt.sign({user}, process.env.SECRET_KEY);
        console.log(token);
        globalToken = token;

        // const date = new Date();
        // const expireDate = date.setSeconds({sec: 20}).toString();
        // console.log(date);
        // console.log(expireDate);
        // res.cookie("auth-token", token)
        res.status(200).json({token, user})

      } catch (err) {
        res.status(500).json(err)
      }
  }
  const VerifyToken = (req, res) => {
    const result = jwt.decode(globalToken);
    res.status(200).json(result.user)
  }

  const logOut = (req, res) => {
    globalToken = {}
    res.json({
        message : "Goodby Dear User see you next time..."
    })
}

const updatePicture = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = { profilePicture: req.body.profilePicture };


  try {
    let user = await User.findOneAndUpdate(filter, update)

    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    return res.status(500).json(err);
  }

}
const updateTarget = async (req, res) => {

  try {
    let user;
    const arg = req.params.arg;
    const filter = { _id: req.params.id };

    if(arg == 'lastname') {
      const update = { lastname : req.body.lastname };
      user = await User.findOneAndUpdate(filter, update)
    }else if(arg == 'firstname') {
      const update = { firstname : req.body.firstname };
      user = await User.findOneAndUpdate(filter, update)
    }else if(arg == 'email') {
      const update = { firstname : req.body.firstname };
      user = await User.findOneAndUpdate(filter, update)
    }else if(arg == 'tel') {
      const update = { tel : req.body.tel };
      user = await User.findOneAndUpdate(filter, update)
    }else if(arg == 'dateBirth') {
      const update = { dateBirth : req.body.dateBirth };
      user = await User.findOneAndUpdate(filter, update)
    }
    
    res.status(200).json(user);
    
    console.log(user);
  } catch (err) {
    return res.status(500).json(err);
  }

}
const updateFirstname = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = { firstname: req.body.firstname };


  try {
    let user = await User.findOneAndUpdate(filter, update)

    res.status(200).json(user);
    console.log(user);
  } catch (err) {
    return res.status(500).json(err);
  }

}

const updateProfile = async (req, res) => {
  
  const userProfile = await User.findOne({ uuid: req.params.id });
  if (userProfile.uuid == req.params.id || userProfile.isAdmin) {
    

    const validPassword = await bcrypt.compare(req.body.password, userProfile.password)
        !validPassword && res.status(400).json("wrong password");

    if (req.params.newPassword && req.params.newPassword == req.params.confirmNewPassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.params.newPassword, salt);
          } catch (err) {
            return res.status(500).json(err);
          }
        }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
}

  module.exports = { oneUser, updatePicture, userRegistration, userLogin, adminLogin, logOut, updateProfile, VerifyToken, updateTarget, updateFirstname};