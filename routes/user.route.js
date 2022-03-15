const express = require('express');
const {
    Users,
    getCountUsersByMonth,
    oneUser, 
    updatePicture, 
    updateTarget, 
    updatePassword, 
    userRegistration, 
    userLogin, 
    adminLogin, 
    logOut, 
    updateDateBirth, 
    getAllExistingUsers,
    deleteUser } = require('../controllers/User.controller');
const router = express.Router();


router.get('/allusers', Users);
router.post('/user/registration', userRegistration);
router.post('/user/login', userLogin);
router.post('/user/admin-login', adminLogin)
router.delete('/deleteUser/:id', deleteUser);
router.get('/user/oneUser/:email', oneUser);
router.put('/user/updatePicture/:id', updatePicture)
router.put('/user/updateTarget/:id/:arg', updateTarget)
router.put('/user/updatePassword/:id/:oldPassword', updatePassword)
router.get('/user/logOut', logOut);
router.put('/user/update/:id', updateDateBirth)
router.get('/users/getDailyLogs', getCountUsersByMonth)
router.get('/UsersNum', getAllExistingUsers)

module.exports = router;