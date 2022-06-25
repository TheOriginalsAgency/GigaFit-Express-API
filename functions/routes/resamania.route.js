const express = require('express');
const { mergeGigaFitClubs, getGigaFitClubStudios } = require('../controllers/Resamania.controller')
const router = express.Router()

// Program Crud
router.get('/mergeGigafitClubs', mergeGigaFitClubs)
router.get('/gigafitClubStudios/:clubId', getGigaFitClubStudios)


module.exports = router;