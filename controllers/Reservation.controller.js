const Reservation = require('../models/Reservation.model')

// Get All Events
const allReservationByUser = async (req, res) => {
    try {

        const reservations = await Reservation.find({userId: req.params.id});
        res.status(200).json(reservations);

    } catch(err) {
        res.status(500).json(err);
    }
}

// Get All Events
const EventIsReserved = async (req, res) => {
    try {

        const reservation = await Reservation.findOne({userId: req.params.id, eventId: req.params.eventId});
        var result;
        if(reservation) {
            // const eventList = reservation.eventIds;
            // for(var i = 0; i < eventList.length; i++) {
            //     if(eventList[i] == req.params.eventId){
            //         result = 'exist';
            //     }
            // }
            result = 'exist';
        }else {
            result = 'not exist'
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
        // const resExist = await Reservation.findOne({ userId: req.body.userId });
        // if(resExist){
        //     const result = await resExist.updateOne({ $push: { eventIds: req.body.eventId}});
        //     res.status(200).json(result);
        // }else {
            // const listEvents = [];
            // listEvents.push(req.body.eventId)
            const newReservation = new Reservation({
                userId: req.body.userId,
                eventId: req.body.eventId,
            });
            console.log(newReservation);
            const reservation = await newReservation.save();
            res.status(200).json(reservation);
        //}

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

// Annuler Reservation
const annulerReservation = async (req, res) => {
    try {
        const resExist = await Reservation.findOne({ userId: req.params.userId, eventId: req.params.eventId });
        if(resExist){
            const result = await resExist.delete();
            res.status(200).json(result);
        }

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

//All Reservation
const allReservation = async (req , res) => {
    const allresCount = await Reservation.count();
    res.json(allresCount);
    console.log(allresCount);
}



module.exports = {
    allReservationByUser,
    addReservation,
    annulerReservation,
    EventIsReserved,
    allReservation
}