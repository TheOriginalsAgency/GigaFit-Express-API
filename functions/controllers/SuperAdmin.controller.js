const SuperAdmin = require("../models/SuperAdmin.model");
const Admin = require("../models/Admin.model");
const Logger = require("../models/logger.model");
const { RegisterValidation, LoginValidation } = require('../validations/authValidation');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { listen } = require("express/lib/application");
const messages = require('../common/common_messages/return_messages')
const common_methods = require('../common/common_methods/common_methods')


const oneSuperAdmin  = async (req, res) => {
  try {
    const superAdmin = await SuperAdmin.findOne({ email: req.params.email });
        !superAdmin && res.status(404).json("SuperAdmin not found");
 
        res.status(200).json(superAdmin)
  } catch (error) {
    
  }
}

const superAdminRegistration = async (req, res) => {
    try {

      const salt = await bcrypt.genSalt(10);
      //generate new password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      //create new user
      const newSuperAdmin = new SuperAdmin({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        gender: req.body.gender,
        email: req.body.email,
        tel: req.body.tel,
        dateBirth: req.body.dateBirth,
        password: hashedPassword,
      });
      console.log(newSuperAdmin);

      const checkSuperAdmin = await SuperAdmin.findOne({ email: newSuperAdmin.email });
        console.log(checkSuperAdmin);
        if(checkSuperAdmin) return res.status(404).json('Cet Email existe déja')
      //save user and respond
      const superadmin = await newSuperAdmin.save();
      const success = 'Success'
      res.status(200).json({superadmin, success});

    } catch (err) {
      res.status(500).json(err)
      console.log('My => '+ err);
    }
  }

  const superAdminLogin = async (req, res) => {
    try {
      //Validation of Entered Values
        const {error} = LoginValidation(req.body);
        if(error) return res.status(400).json(error.details[0].message);
        let token;
        let admin;
        let superAdmin = await SuperAdmin.findOne({ email: req.body.email });
        console.log(superAdmin);
        if(!superAdmin) {
            admin = await Admin.findOne({ email: req.body.email });
            console.log(admin);
            if(!admin) return res.status(404).json('Cet Email n\'existe pas')
        }
        let validPassword;
        if (superAdmin) {
            validPassword = await bcrypt.compare(req.body.password, superAdmin.password)
            if(!validPassword) return res.status(400).json('Votre Mot de Passe est Incorrect')
            token = jwt.sign({superAdmin}, "MohammedDevGigaFit2021");
        }
        if(admin) {
            validPassword = await bcrypt.compare(req.body.password, admin.password)
            if(!validPassword) return res.status(400).json('Votre Mot de Passe est Incorrect')
            token = jwt.sign({admin}, "MohammedDevGigaFit2021");
        }
        
        console.log(token);
        const success = 'Success'
  
        const t = new Date();
        const date = ('0' + t.getDate()).slice(-2);
        const month = ('0' + (t.getMonth() + 1)).slice(-2);
        const year = t.getFullYear();
        if (superAdmin) {
            const loggedUser = await Logger.findOne({id_user: superAdmin._id, dateLog : `${date}-${month}-${year}`})
            console.log(loggedUser);
            if(loggedUser) return res.status(200).json({token, superAdmin, success});
            const newLog = new Logger({
                id_user: superAdmin._id,
                status: 'LogIn-superAdmin',
                gender: superAdmin.gender,
                dateLog: `${date}-${month}-${year}`,
            });
            const logger = await newLog.save();
            // res.cookie("auth-token", token, {expire: new Date().setHours({hours: 3})})
            res.status(200).json({token, superAdmin, success})
        }
        if(admin) {
            validPassword = await bcrypt.compare(req.body.password, admin.password)
            if(!validPassword) return res.status(400).json('Votre Mot de Passe est Incorrect')
            token = jwt.sign({admin}, "MohammedDevGigaFit2021");
            const loggedUser = await Logger.findOne({id_user: admin._id, dateLog : `${date}-${month}-${year}`})
                console.log(loggedUser);
                if(loggedUser) return res.status(200).json({token, admin, success});
                const newLog = new Logger({
                    id_user: admin._id,
                    status: 'LogIn-Admin',
                    gender: admin.gender,
                    dateLog: `${date}-${month}-${year}`,
                });
                const logger = await newLog.save();
                // res.cookie("auth-token", token, {expire: new Date().setHours({hours: 3})})
                res.status(200).json({token, admin, success})
        }
        

      } catch (err) {
        res.status(500).json('ERRRROR::'+err)
      }
  }

  const VerifyToken = (req, res) => {
    if (req.params.globalToken) {
      const result = jwt.decode(req.params.globalToken);
      if (result.superAdmin) {
          const superAdmin = result.superAdmin;
        res.status(200).json({superAdmin})
      }else if(result.admin) {
          const admin = result.admin;
        res.status(200).json({admin})
      }
        
    }
    
  }


    module.exports = { 
    oneSuperAdmin,
    superAdminRegistration,
    superAdminLogin,
    VerifyToken
    };
