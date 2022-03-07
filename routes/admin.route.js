const express = require('express');
const {
    oneAdmin,
    AdminRegistration,
    AdminLogin,
    VerifyToken, 
    Admins,
    deleteAdmin} = require('../controllers/Admin.controller');
const router = express.Router();

router.post('/admin/registration', AdminRegistration);
router.get('/admin/data', oneAdmin);
router.get('/admin/alladmin',Admins);
router.delete('/deleteAdmin/:id', deleteAdmin);



module.exports = router;