const Course = require('../models/course.model')
const Event = require('../models/event.model')

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

        //Delete all reservations associeted
        events.forEach((e) => {
            Reservations.deleteMany({eventId: e._id}).then( (res) => {
                console.log(res);
            })
        })

        //Delete all events associeted
        Event.deleteMany({ courseId: req.params.id}).then( (res) => {
            console.log(res);
        })

        //Delete Cours
        const resExist = await Course.findByIdAndDelete(req.params.id);

        res.status(200).json(resExist);
        

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
