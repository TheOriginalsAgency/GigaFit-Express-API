const express = require('express');
const {
    getCountUsersByMonth,
    oneUser, 
    updatePicture, 
    updateTarget, 
    updatePassword, 
    userRegistration, 
    userLogin, 
    adminLogin, 
    logOut, 
    updateProfile, 
    getAllExistingUsers } = require('../controllers/User.controller');
const router = express.Router();

router.post('/user/registration', userRegistration);
router.post('/user/login', userLogin);
router.post('/user/admin-login', adminLogin)

router.get('/user/oneUser/:email', oneUser);
router.put('/user/updatePicture/:id', updatePicture)
router.put('/user/updateTarget/:id/:arg', updateTarget)
router.put('/user/updatePassword/:id/:oldPassword', updatePassword)
router.get('/user/logOut', logOut);
router.put('/user/update/:id', updateProfile)
router.get('/users/getDailyLogs', getCountUsersByMonth)
router.get('/UsersNum', getAllExistingUsers)

module.exports = router;