const Reservation = require('../models/Reservation.model')

// Get All Events
const allReservationByUser = async (req, res) => {
    try {

        const reservations = await Reservation.find({userId: req.params.id});
        res.status(200).json(reservations);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Get All Events
const EventIsReserved = async (req, res) => {
    try {

        const reservations = await Reservation.findOne({userId: req.params.id});
        const eventList = reservations.eventIds;
        for(var i = 0; i < eventList.length; i++) {
            if(eventList[i] == req.params.eventId){
                res.status(200).json("exist");
            }else {
                res.status(200).json("not exist");
            }
        }

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Add new Event
const addReservation = async (req, res) => {
    try {
        const resExist = await Reservation.findOne({ userId: req.body.userId });
        if(resExist){
            const result = await resExist.updateOne({ $push: { eventIds: req.body.eventId}});
            res.status(200).json(result);
        }else {
            const listEvents = [];
            listEvents.push(req.body.eventId)
            const newReservation = new Reservation({
                userId: req.body.userId,
                eventIds: listEvents,
            });
            console.log(newReservation);
            const reservation = await newReservation.save();
            res.status(200).json(reservation);
        }

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

// Annuler Reservation
const annulerReservation = async (req, res) => {
    const targetedRes = await Reservation.findOne({ userId: req.params.id });
    console.log(targetedRes);
    try {
        if(targetedRes) {
            const res = await targetedRes.updateOne({ $set: req.body });
              res.status(200).json(res);
        }
      } catch (err) {
        res.status(500).json(err);
      }
}



module.exports = {
    allReservationByUser,
    addReservation,
    annulerReservation,
    EventIsReserved
}