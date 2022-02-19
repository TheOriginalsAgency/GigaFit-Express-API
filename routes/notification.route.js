const exp = require('express');
const {allNotif, oneNotif, addNotif, updateNotif, deleteNotif} = require('../controllers/Notification.controller');
const router = exp.Router();

router.get('/notif', allNotif)
router.post('/notif/addnew', addNotif)
router.get('/notif/:id', oneNotif)
router.put('/notif/update/:id', updateNotif)
router.delete('/notif/delete/:id', deleteNotif)

module.exports = router;