const express = require('express');
const router = express.Router();
const controller = require('./rank.controller');
const authJwt = require('../auth_jwt/authJwt.middleware');
const authRank = require('./rank.middleware');
router.get('/get-rank-by-day',
authJwt.verifyAccessToken,
controller.getRankByDay
)

router.get('/get-rank-by-month',
authJwt.verifyAccessToken,
controller.getRankByMonth
)

router.get('/get-rank-by-event/:event_id',
authJwt.verifyAccessToken,
authRank.validateGetRankByEvent,
controller.getRankByEvent
)




module.exports = router;