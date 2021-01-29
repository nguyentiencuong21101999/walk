const express = require('express');
const router = express.Router();
const authEvent = require('./event.middleware')
const authJwt = require('../auth_jwt/authJwt.middleware.js')

const controller = require('./event.controller');
router.post('/add',
authEvent.validateAdd,
authJwt.verifyAccessToken,
controller.add)

router.post('/upload-image/:event_id',
    authEvent.validateUploadImage,
    authJwt.verifyAccessToken,
    controller.uploadImage
)
router.get('/:event_id',
authEvent.validateJoinEvent,
controller.EventById
)
router.get('/all',
controller.allEvent
)
router.post('/join/:event_id',
authEvent.validateJoinEvent,
authJwt.verifyAccessToken,
controller.joinEvent)

router.post('/joined',
authJwt.verifyAccessToken,
controller.eventJoined
)

module.exports = router;
