
const express = require('express');
const router = express.Router();
const authActivity = require('./activity.middleware')
const authJwt = require('../auth_jwt/authJwt.middleware');
const controller = require('./activity.controller');

router.post('/add',
authActivity.validateAdd,
authJwt.verifyAccessToken,
controller.addActivity
)

module.exports = router;