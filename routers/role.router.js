const express = require('express');
const router = express.Router();
const AuthMiddleware =  require('../middleware/AuthMiddleware')
const authJwt = require('../middleware/authJwt')

let controller = require('../controller/role.controller');
router.get('/member',AuthMiddleware.isCheckToken,AuthMiddleware.isAuth,controller.member)
router.get('/admin',AuthMiddleware.isCheckToken,AuthMiddleware.isAuth,authJwt.isAdmin,controller.admin)
router.get('/moderator',AuthMiddleware.isCheckToken,AuthMiddleware.isAuth,authJwt.isModerator,controller.moderator)

module.exports = router;