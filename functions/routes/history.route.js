const express = require('express');
const {
    programHistory,
    addHistory } = require('../controllers/History.controller');
const router = express.Router();

router.get('/history/programHistory/:program_id/:user_id', programHistory);
router.post('/history/newHistory/:program_id/:user_id', addHistory);

module.exports = router;