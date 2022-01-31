const express = require('express');
const {
    oneSuperAdmin,
    superAdminRegistration,
    superAdminLogin,
    VerifyToken } = require('../controllers/SuperAdmin.controller');
const router = express.Router();

router.post('/super-admin/registration', superAdminRegistration);
router.post('/super-admin/login', superAdminLogin);
router.get('/super-admin/data', oneSuperAdmin);
router.get('/super-admin/verify/:globalToken', VerifyToken)


module.exports = router;