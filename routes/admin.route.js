const express = require('express');
const {
    oneAdmin,
    AdminRegistration,
    AdminLogin,
    VerifyToken } = require('../controllers/Admin.controller');
const router = express.Router();

router.post('/admin/registration', AdminRegistration);
router.get('/admin/data', oneAdmin);



module.exports = router;