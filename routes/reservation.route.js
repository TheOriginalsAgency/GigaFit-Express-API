const express = require('express');
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved } = require('../controllers/Reservation.controller')
const router = express.Router()

// Program Crud
router.get('/Reservation/:id', allReservationByUser)
router.get('/isResrvationExist/:id/:eventId', EventIsReserved)
router.post('/Reservation/addnew', addReservation)
router.put('/Reservation/update/:id', annulerReservation)


module.exports = router;