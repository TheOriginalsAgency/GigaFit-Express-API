const express = require('express');
const { allPrograms, oneProgram,  addProgram, updateProgram, deleteProgram, cardioPrograms, bodyPartQueryProgram } = require('../controllers/Program.controller')
const router = express.Router()

// Program Crud
router.get('/programs', allPrograms)
router.get('/oneProgram/:id', oneProgram)
router.post('/program/addnew', addProgram)
router.put('/program/update/:id', updateProgram)
router.delete('/program/delete/:id', deleteProgram)

//Specific Querys
router.get('/programs/cardio', cardioPrograms)
router.get('/programs/customizedQuery/:worktype/:bodypart', bodyPartQueryProgram)

module.exports = router;