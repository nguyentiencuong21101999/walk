const express = require('express');
const router = express.Router();
const verifySignUp = require('../middleware/verifySignUp')
const authJwt  = require('../middleware/authJwt')
const controller = require('../controller/login.controller')
router.get('/',controller.login)
router.get('/refreshToke',controller.refreshToken)

module.exports = router