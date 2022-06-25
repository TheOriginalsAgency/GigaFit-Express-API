const express = require('express');
const { allClubs,oneClub, addClub, updateClub, deleteClub,getCountAll, deleteCoachs, deleteStudios } = require('../controllers/Club.controller')
const router = express.Router()

router.get('/clubs', allClubs)
router.get('/club/:id', oneClub)
router.post('/club/addnew', addClub)
router.put('/club/update/:id', updateClub)
router.delete('/club/delete/:id', deleteClub)
router.delete('/club/deleteCoach/:id/:coach', deleteCoachs)
router.delete('/club/deleteStudio/:id/:studio', deleteStudios)
router.get('/numClub', getCountAll)

module.exports = router;