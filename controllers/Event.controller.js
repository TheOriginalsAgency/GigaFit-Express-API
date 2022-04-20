const Event = require('../models/event.model')

// Get All Events
const allEventsByClub = async (req, res) => {
    try {

        const events = await Event.find({clubId: req.params.id});
        res.status(200).json(events);

    } catch(err) {
        res.status(500).json(err);
    }
}

const getEventByDate = async (req, res) => {
    try {
        const events = await Event.find({
            clubId: req.params.id,
            dateBegin: { $gte: new Date(req.params.dateFrom), $lte: new Date(req.params.dateTo)}
        });
        res.status(200).json(events);
        
    } catch (err) {
        console.log(err);
    }
}


// Add new Event
const addEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        console.log(newEvent);
        const event = await newEvent.save();
        res.status(200).json(event);

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

// Update Event
const updateEvent = async (req, res) => {
    const targetedEvent = await Event.findOne({ _id: req.params.id });
    console.log(targetedEvent);
    try {
        if(targetedEvent) {
            const event = await targetedEvent.updateOne({ $set: req.body });
              res.status(200).json(event);
        }
      } catch (err) {
        res.status(500).json(err);

      }
}

// delete Event
const deleteEvent = async (req, res) => {
    const targetedEvent = await Event.findOne({ uuid: req.params.id });
    console.log(targetedEvent);
    try {
        if(targetedEvent) {
            const event = await targetedEvent.deleteOne();
            console.log(event);
            res.status(200).json(event);
        }
    } catch(err) {
        res.status(500).json(err);
        console.log(err);
    }
}

module.exports = {
    allEventsByClub,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventByDate
}