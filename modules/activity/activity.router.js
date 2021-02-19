
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

router.get("/get-activity",
authJwt.verifyAccessToken,
authActivity.validateGetActivity,
controller.getActivity
)

router.get("/get-activity-by-event/:event_id",
authActivity.validateGetActivityByEvent,
authJwt.verifyAccessToken,
controller.getActivityByEvent
)
module.exports = router;