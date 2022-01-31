const Admin = require("../models/Admin.model");
const Logger = require("../models/logger.model");
const { RegisterValidation, LoginValidation } = require('../validations/authValidation');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { listen } = require("express/lib/application");
const messages = require('../common/common_messages/return_messages')
const common_methods = require('../common/common_methods/common_methods')


const oneAdmin  = async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.params.email });
        !user && res.status(404).json("Admin not found");
 
        res.status(200).json(user)
  } catch (error) {
    
  }
}

const AdminRegistration = async (req, res) => {
    try {

      const salt = await bcrypt.genSalt(10);
      //generate new password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newAdmin = new Admin({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
        dateBirth: req.body.dateBirth,
        password: hashedPassword,
      });
      console.log(newAdmin);

      const checkAdmin = await Admin.findOne({ email: newAdmin.email });
        console.log(checkAdmin);
        if(checkAdmin) return res.status(404).json('Cet Email existe déja')
      //save user and respond
      const admin = await newAdmin.save();
      const success = 'Success'
      res.status(200).json({admin, success});

    } catch (err) {
      res.status(500).json(err)
      console.log('My => '+ err);
    }
  }




    module.exports = { 
        oneAdmin,
        AdminRegistration
    };
