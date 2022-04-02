const express = require('express');
const { allEventsByClub, addEvent, updateEvent, deleteEvent } = require('../controllers/Event.controller')
const router = express.Router()

// Program Crud
router.get('/Events/:id', allEventsByClub)
router.post('/event/addnew', addEvent)
router.put('/event/update/:id', updateEvent)
router.delete('/event/delete/:id', deleteEvent)


module.exports = router;