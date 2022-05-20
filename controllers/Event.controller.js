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

const oneEventById = async (req, res) => {
    try {

        const event = await Event.findOne({_id: req.params.id});
        res.status(200).json(event);

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
// const deleteEvent = async (req, res) => {
//     console.log(req.params.id);
//     const targetedEvent = await Event.findOne({ uuid: req.params.id });
//     console.log(targetedEvent);
//     try {
//         if(targetedEvent) {
//             console.log(targetedEvent);
//             const event = await targetedEvent.deleteOne();
//             console.log(event);
//             res.status(200).json(event);
//         }
//     } catch(err) {
//         res.status(500).json(err);
//         console.log(err);
//     }
// }

const delet = (req,res) => {

        //Delete all reservations associeted
        Reservation.deleteMany({ eventId: req.params.id}).then( (res) => {
            console.log(res);
            Event.findByIdAndDelete(req.params.id, function (err, docs) {
                if (err){
                    console.log("is not "+err)
                    res.status(500).json(err)
                }
                else{
                    console.log("Deleted : ", docs);
                    res.status(200).json(docs);
                }
            });
        })

        

}

const deleteEventBYCourseId = (req,res) => {

    try {
        Event.findByIdAndDelete({courseId:req.params.idCourse}, function (err, docs) {
            if (err){
                console.log("is not "+err)
            }
            else{
                console.log("Deleted : ", docs);
                res.status(200).json(docs);
            }
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

const allevents = async (req,res) => {
    const all = await Event.count();
    res.status(200).json(all)
}

module.exports = {
    allEventsByClub,
    addEvent,
    updateEvent,
    delet,
    getEventByDate,
    oneEventById,
    allevents,
    deleteEventBYCourseId
}