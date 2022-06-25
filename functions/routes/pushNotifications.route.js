const express = require('express');
const { SendNotification, SendNotificationToDevice} = require('../controllers/pushNotifications.controller')
const router = express.Router();

router.post('/SendNotification', SendNotification);
router.post('/SendNotificationToDevice', SendNotificationToDevice);

module.exports = router;