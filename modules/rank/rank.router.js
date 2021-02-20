const express = require('express');
const router = express.Router();
const controller = require('./rank.controller');
const authJwt = require('../auth_jwt/authJwt.middleware');
const authRank = require('./rank.middleware');
router.get('/',
authRank.validateGetRank,
controller.getRank
)

router.get('/event/:event_id',
authRank.validateGetRankByEvent,
controller.getRankByEvent
)
module.exports = router;