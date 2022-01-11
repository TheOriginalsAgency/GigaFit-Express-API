const express = require('express');
const { oneUser, updatePicture, updateTarget, updateFirstname, userRegistration, userLogin, adminLogin, logOut, forgetPassword, updateProfile, VerifyToken } = require('../controllers/User.controller');
const router = express.Router();

router.post('/user/registration', userRegistration);
router.post('/user/login', userLogin);
router.post('/user/admin-login', adminLogin)
router.post('/user/forgotPassword/:email', forgetPassword)
router.get('/user/verify', VerifyToken)
router.get('/user/oneUser/:email', oneUser);
router.put('/user/updatePicture/:id', updatePicture)
router.put('/user/updateTarget/:id/:arg', updateTarget)
router.put('/user/updateFirstname/:id', updateFirstname)
router.get('/user/logOut', logOut);
router.put('/user/update/:id', updateProfile)

module.exports = router;