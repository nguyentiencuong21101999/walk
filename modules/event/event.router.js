const express = require('express');
const router = express.Router();

const controller = require('./event.controller');
router.get('/add',controller.add)

module.exports = router;
