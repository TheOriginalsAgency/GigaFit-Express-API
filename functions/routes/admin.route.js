const express = require('express');
const {
    oneAdmin,
    AdminRegistration,
    AdminLogin,
    VerifyToken, 
    Admins,
    deleteAdmin,alladmin} = require('../controllers/Admin.controller');
const router = express.Router();

router.post('/admin/registration', AdminRegistration);
router.get('/admin/data', oneAdmin);
router.get('/admin/alladmin',Admins);
router.delete('/deleteAdmin/:id', deleteAdmin);
router.get('/alladmin', alladmin);



module.exports = router;