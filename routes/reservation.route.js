const express = require('express');
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved , allReservation} = require('../controllers/Reservation.controller')
const router = express.Router()

// Program Crud
router.get('/Reservation/:id', allReservationByUser)
router.get('/isResrvationExist/:id/:eventId', EventIsReserved)
router.post('/Reservation/addnew', addReservation)
router.put('/Reservation/update/:userId/:eventId', annulerReservation)
router.get('/reservationCount', allReservation)



module.exports = router;