const express = require('express');
const router = express.Router();
const controller = require('../controller/login.controller')
router.get('/',controller.login)
router.get('/refreshToke',controller.refreshToken)

module.exports = router