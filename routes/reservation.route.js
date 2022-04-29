const express = require('express');
<<<<<<< HEAD
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved, allReservation, allReservationByEvent } = require('../controllers/Reservation.controller')
=======
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved, countallReservation ,allReservation } = require('../controllers/Reservation.controller')
>>>>>>> 8e760bd7e233c5a3430e86ec7ea2d9d27b184d7f
const router = express.Router()

// Reservation Methods
router.get('/Reservations', allReservation);
router.get('/Reservation/:id', allReservationByUser)
router.get('/ReservationByEvents/:id', allReservationByEvent)
router.get('/isResrvationExist/:id/:eventId', EventIsReserved)
router.post('/Reservation/addnew', addReservation)
router.put('/Reservation/update/:userId/:eventId', annulerReservation)
router.get('/reservationCount', countallReservation)



module.exports = router;