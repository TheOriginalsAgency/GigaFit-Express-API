const Course = require('../models/course.model')
const Event = require('../models/event.model')
const Reservation = require('../models/Reservation.model')

// Get All Programms
const allCourses = async (req, res) => {
    try {

        const courses = await Course.find({ club: req.params.id });
        res.status(200).json(courses);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Get One Program
const oneCourse = async (req, res) => {

    try {
        const course = await Course.findOne({ _id: req.params.id });
            res.status(200).send(course);

    } catch(err) {
        res.status(500).json(err);
        console.log('My error !!! ' + err);
    }
}

// Add new Course
const addCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        console.log(newCourse);
        const course = await newCourse.save();
        res.status(200).json(course);

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}


// Update Course
const updateCourse = async (req, res) => {
    const targetedCourse = await Course.findOne({ _id: req.params.id });
    try {
        if(targetedCourse) {
            const course = await targetedCourse.updateOne({ $set: req.body });
              res.status(200).json(course);
        }
        
      } catch (err) {
        res.status(500).json(err);
      }
    
}


// delete Course
const deleteCourse = async (req, res) => {
    try {
        const events = await Event.find({ courseId: req.params.id});
        console.log('Desired Events :' + events);
        //Delete all reservations associeted
        events.forEach((e) => {
            Reservation.deleteMany({eventId: e._id}).then( (res) => {
                console.log('Desired Reservations :');
                console.log(res);
            })
        })

        //Delete all events associeted
        Event.deleteMany({ courseId: req.params.id}).then( (res) => {
            console.log('deleted Events :');
            console.log(res);
        })

        //Delete Cours
        Course.findByIdAndDelete(req.params.id,  function (err, docs) {
            if (err){
                res.status(405).json(err);
            }
            else{
                console.log("Deleted : ", docs);
                
                res.status(200).json(docs);
            }
        });

        

    } catch(err) {
        res.status(500).json(err);
        console.log('My => '+ err);
    }
}

const allcourses = async (req ,res) => {
    const all = await Course.count();
    res.status(200).json(all);
}


module.exports = {
    allCourses,
    oneCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    allcourses
}
