const express = require('express');
const router = express.Router();
const controller = require('../controller/login.controller')
const authJwt = require('../middleware/AuthJwt')
router.get('/',controller.login)
router.get('/refreshToke',authJwt.verifyRefreshToken,controller.refreshToken)

module.exports = router