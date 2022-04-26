const Reservation = require('../models/Reservation.model')

// Get All Events
const allReservationByUser = async (req, res) => {
    try {

        const reservation = await Reservation.findOne({userId: req.params.id});
        res.status(200).json(reservation);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Get All Events
const EventIsReserved = async (req, res) => {
    try {

        const reservation = await Reservation.findOne({userId: req.params.id});
        var result = 'not exist';
        if(reservation) {
            const eventList = reservation.eventIds;
            for(var i = 0; i < eventList.length; i++) {
                if(eventList[i] == req.params.eventId){
                    result = 'exist';
                }
            }
        }
        
        res.status(200).json(result);


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
    try {
        const resExist = await Reservation.findOne({ userId: req.params.userId });
        console.log('Hjjjj'+ resExist);
        if(resExist){
            console.log('BBBhh'+ resExist);
            const result = await resExist.updateOne({ $pull: { eventIds: req.params.eventId}});
            console.log(result);
            res.status(200).json(result);
        }

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}



module.exports = {
    allReservationByUser,
    addReservation,
    annulerReservation,
    EventIsReserved
}