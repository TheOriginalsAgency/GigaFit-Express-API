const express = require('express');
<<<<<<< HEAD
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved , allReservation} = require('../controllers/Reservation.controller')
=======
const { allReservationByUser, addReservation, annulerReservation, EventIsReserved, allReservation } = require('../controllers/Reservation.controller')
>>>>>>> a7d209dd57f638ab543fbe2dff0ec4ed7e176a29
const router = express.Router()

// Reservation Methods
router.get('/Reservations', allReservation);
router.get('/Reservation/:id', allReservationByUser)
router.get('/isResrvationExist/:id/:eventId', EventIsReserved)
router.post('/Reservation/addnew', addReservation)
router.put('/Reservation/update/:userId/:eventId', annulerReservation)
router.get('/reservationCount', allReservation)



module.exports = router;