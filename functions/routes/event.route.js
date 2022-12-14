const express = require('express');
const { allEventsByClub, addEvent, updateEvent, delet, getEventByDate, oneEventById , allevents, deleteEventBYCourseId } = require('../controllers/Event.controller')
const router = express.Router()

// Program Crud
router.get('/Events/:id', allEventsByClub)
router.get('/OneEvent/:id', oneEventById)
router.get('/Events/:id/:dateFrom/:dateTo', getEventByDate)
router.post('/event/addnew', addEvent)
router.put('/event/update/:id', updateEvent)
router.delete('/event/delete/:id', delet)
router.delete('/event/deleteWithCourse/:idCourse', deleteEventBYCourseId)
router.get('/allevents', allevents)


module.exports = router;