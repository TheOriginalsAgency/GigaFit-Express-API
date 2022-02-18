const express = require('express');
const { getGigaFitClubs, getGigaFitClubStudios } = require('../controllers/Resamania.controller')
const router = express.Router()

// Program Crud
router.get('/gigafitClubs', getGigaFitClubs)
router.get('/gigafitClubStudios/:clubId', getGigaFitClubStudios)


module.exports = router;