const express = require('express');
const { allSessions, userSessions, addSession, updateSession, deleteSession, getAllExistingSessions } = require('../controllers/Session.controller')
const router = express.Router()

// Session Crud
router.get('/sessions', allSessions)
router.get('/userSessions/:userId', userSessions)
router.post('/session/addnew', addSession)
router.put('/session/update/:id', updateSession)
router.delete('/session/delete/:id', deleteSession)
router.get('/numSessions', getAllExistingSessions)

module.exports = router;