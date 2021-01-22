const express = require('express');
const router = express.Router();
const authEvent = require('./event.middleware')
const authJwt = require('../auth_jwt/authJwt.middleware.js')

const controller = require('./event.controller');
router.post('/add',
authEvent.validateAdd,
authJwt.verifyAccessToken,
controller.add)

router.post('/upload-image-event/:id',
    authEvent.validateUploadImageEvent,
    authJwt.verifyAccessToken,
    controller.uploadImageEvent
)
router.post('/get-all-event',
authJwt.verifyAccessToken,
controller.getAllEvent
)


module.exports = router;
