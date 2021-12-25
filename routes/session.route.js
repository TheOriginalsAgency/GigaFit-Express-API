const express = require('express');
const { allSessions, addSession, updateSession, deleteSession } = require('../controllers/Session.controller')
const router = express.Router()

// Session Crud
router.get('/sessions', allSessions)
router.post('/session/addnew', addSession)
router.put('/session/update/:id', updateSession)
router.delete('/session/delete/:id', deleteSession)

module.exports = router;