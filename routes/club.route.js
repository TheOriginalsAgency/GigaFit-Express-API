const express = require('express');
const { allClubs,oneClub, addClub, updateClub, deleteClub } = require('../controllers/Club.controller')
const router = express.Router()

router.get('/clubs', allClubs)
router.get('/club/:id', oneClub)
router.post('/club/addnew', addClub)
router.put('/club/update/:id', updateClub)
router.delete('/club/delete/:id', deleteClub)

module.exports = router;