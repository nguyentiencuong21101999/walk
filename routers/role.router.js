const express = require('express');
const router = express.Router();
const AuthMiddleware =  require('../middleware/AuthMiddleware')
const authJwt = require('../middleware/authJwt')

let controller = require('../controller/role.controller');
router.get('/admin',AuthMiddleware.isAuth,controller.admin)
router.get('/member',authJwt.verifyToken,controller.member)
router.get('/moderator',AuthMiddleware.isAuth,authJwt.isModerator,controller.moderator)

module.exports = router;