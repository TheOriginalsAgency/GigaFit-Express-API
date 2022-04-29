const express = require('express');
const { allCourses, addCourse, oneCourse, updateCourse, deleteCourse , allcourses } = require('../controllers/Course.controller')
const router = express.Router()

// Program Crud
router.get('/Courses/:id', allCourses)
router.get('/oneCourse/:id', oneCourse)
router.post('/course/addnew', addCourse)
router.put('/course/update/:id', updateCourse)
router.delete('/course/delete/:id', deleteCourse)
router.get('/allcourses', allcourses)


module.exports = router;