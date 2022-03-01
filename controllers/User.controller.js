const User = require("../models/User.model");
const Logger = require("../models/logger.model");
const { RegisterValidation, LoginValidation } = require('../validations/authValidation');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { listen } = require("express/lib/application");
const messages = require('../common/common_messages/return_messages')
const common_methods = require('../common/common_methods/common_methods')

let globalToken;

const Users = async (req,res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json("no User");
  }
}


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
      if(error) return res.status(400).send(error.details[0].message);
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
      console.log(newUser);

      const checkUser = await User.findOne({ email: newUser.email });
        console.log(checkUser);
        if(checkUser) return res.status(404).json('Cet Email existe déja')
      //save user and respond
      const user = await newUser.save();
      const success = 'Success'
      res.status(200).json({user, success});

    } catch (err) {
      res.status(500).json(err)
      console.log('My => '+ err);
    }
  }

  const userLogin = async (req, res) => {
    try {
      //Validation of Entered Values
        const {error} = LoginValidation(req.body);
        if(error) return res.status(400).json(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if(!user) return res.status(404).json('Cet Email n\'existe pas')
        
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json('Votre Mot de Passe est Incorrect')
    
        const token = jwt.sign({user}, process.env.SECRET_KEY);
        console.log(token);
        const success = 'Success'
  
        const t = new Date();
        const date = ('0' + t.getDate()).slice(-2);
        const month = ('0' + (t.getMonth() + 1)).slice(-2);
        const year = t.getFullYear();
        const loggedUser = await Logger.findOne({id_user: user._id, dateLog : `${date}-${month}-${year}`})
        console.log(loggedUser);
        if(loggedUser) return res.status(200).json({token, user, success});
        const newLog = new Logger({
          id_user: user._id,
          status: 'LogIn',
          gender: user.gender,
          dateLog: `${date}-${month}-${year}`,
      });
        const logger = await newLog.save();
        // res.cookie("auth-token", token, {expire: new Date().setHours({hours: 3})})
        res.status(200).json({token, user, success})

      } catch (err) {
        res.status(500).json(err)
      }
  }


  //  generate && send new password
const forgetPassword = async (req, res) => {
    const user = await User.findOne({ email: req.params.email })
    console.log(user);
    try {
        if (user) {
            //  user found
            const newPassword = common_methods.generateRandomPassword()
            const salt = await bcrypt.genSalt(10);
            //generate new hashed password
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            const updatedUser = await User.findOneAndUpdate({ email: req.params.email }, { password: hashedPassword })

            if (updatedUser) {
                //  password updated successfully
                common_methods.sendMail(req.params.email, newPassword)
                return res.status(201).json({
                    ok: true,
                    message: messages.returnMessages.MAIL_SUCCESS
                });
            }

        } else {
            //  invalid mail address
            return res.status(404).json({
                ok: false,
                message: messages.returnMessages.NOT_FOUND
            })
        }
    } catch (error) {
        console.log('Forgot ERROR 1 ...'+error);
        return res.status(500).json({
            ok: false,
            message: messages.returnMessages.SERVER_ERROR
        })
        
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

        const success = 'Success';
    
        const t = new Date();
        const date = ('0' + t.getDate()).slice(-2);
        const month = ('0' + (t.getMonth() + 1)).slice(-2);
        const year = t.getFullYear();
        const loggedUser = await Logger.findOne({id_user: user._id, dateLog : `${date}-${month}-${year}`})
        console.log(loggedUser);
        if(loggedUser) return res.status(200).json({token, user, success});

        const newLog = new Logger({
          id_user: user._id,
          status: 'LogIn',
          gender: user.gender,
          dateLog: `${date}-${month}-${year}`,
        });
        const logger = await newLog.save();

        res.status(200).json({token, user})

      } catch (err) {
        res.status(500).json(err)
      }
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
    }else if(arg == 'weight') {
      const update = { weight : req.body.weight };
      user = await User.findOneAndUpdate(filter, update)
    }else if(arg == 'height') {
      const update = { height : req.body.height };
      user = await User.findOneAndUpdate(filter, update)
    }
    
    res.status(200).json(user);
    
    console.log(user);
  } catch (err) {
    return res.status(500).json(err);
  }

}
const updatePassword = async (req, res) => {
  try {
      const filter = { _id: req.params.id };

      const user = await User.findOne(filter);
        console.log(user);
        if(!user) return res.status(404).json('Ce compte n\'existe pas')
        
        const validPassword = await bcrypt.compare(req.params.oldPassword, user.password)
        if(!validPassword) return res.status(400).json('Votre Mot de Passe est Incorrect')
        const salt = await bcrypt.genSalt(10);
        //generate new password
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const update = { password: hashedPassword };
        let updatedUser = await User.findOneAndUpdate(filter, update)
        console.log(updatedUser);
        const success = 'Success'
      res.status(200).json({updatedUser, success});
  } catch (err) {
    return res.status(500).json(err);
  }

}

const updateDateBirth = async (req, res) => {

    try {
      let user;
      const filter = { _id: req.params.id };
      const update = { dateBirth : req.body.dateBirth };
      user = await User.findOneAndUpdate(filter, update)
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }

}

const getCountUsersByMonth = async (req, res) => {

  //const allMaleLogInByDay = await Logger.count({ gender: 'Male',$group: 'dateLog'});
  //const allFemaleLogInByDay = await Logger.count({ gender: 'Female',$group: 'dateLog'});
  //var all = allMaleLogInByDay + allFemaleLogInByDay;
  var logList = [];
    const All = await Logger.aggregate([
    { $group: {_id: '$dateLog',all: { $sum: 1 }}}
  ]);
  const Males = await Logger.aggregate([
    { $match: {gender: 'Male'}},
    { $group: {_id: '$dateLog',mens: { $sum: 1 }}}
  ]);
  const Womens = await Logger.aggregate([
    { $match: {gender: 'Female'}},
    { $group: {_id: '$dateLog',womens: { $sum: 1 }}}
  ]);


  for(var i=0; i < All.length; i++){
    for (let j = 0; j < Males.length; j++) {
      if (All[i]._id == Males[j]._id) {
        All[i].mens = Males[j].mens;
      }
    }
  }

  for(var i=0; i < All.length; i++){
    for (let j = 0; j < Womens.length; j++) {
      if (All[i]._id == Womens[j]._id) {
        All[i].womens = Womens[j].womens;
      }
      
    }
  }

  for(var i=0; i < All.length; i++){
    if (!All[i].womens){
        All[i].womens = 0;
    } 
  }
  for(var i=0; i < All.length; i++){
    if (!All[i].mens){
        All[i].mens = 0;
    } 
  }

  res.status(200).json(
      All
    );

}


const getAllExistingUsers = async (req, res) => {
    const allUsers = await User.count();
    res.json(allUsers);

}

  module.exports = { 
    Users,
    oneUser, 
    updatePicture, 
    userRegistration, 
    userLogin, 
    adminLogin, 
    logOut, 
    forgetPassword, 
    updateDateBirth, 
    updateTarget, 
    updatePassword,
    getCountUsersByMonth,
    getAllExistingUsers
  };