const express = require('express');
const router = express.Router();
const authJwt = require('../auth_jwt/authJwt.middleware')
const authRole = require('./role.middleware')
const authJoi = require('../auth_joi/authJoi.role.middleware')
const controller = require('./role.controller')
router.post('/client',
    authJoi.vaidateToken, 
    authJwt.verifyAccessToken,
    authRole.isClient,
    controller.isClient)
router.post('/admin',
    authJoi.vaidateToken,
    authJwt.verifyAccessToken,
    authRole.isAdmin,
    controller.isAdmin)

module.exports = router;