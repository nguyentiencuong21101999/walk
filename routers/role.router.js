const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt')

let controller = require('../controller/role.controller');
router.get('/admin',[authJwt.verifyToken,authJwt.isAdmin],controller.admin)
router.get('/member',authJwt.verifyToken,controller.member)
router.get('/moderator',[authJwt.verifyToken,authJwt.isModerator],controller.moderator)

module.exports = router;