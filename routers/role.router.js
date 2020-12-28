const express = require('express');
const router = express.Router();
const authJwt =  require('../middleware/AuthJwt')
const authRole = require('../middleware/authRole')

let controller = require('../controller/role.controller');
router.get('/member',authJwt.verifyToken,controller.member)
router.get('/admin',authJwt.verifyToken,authRole.isAdmin,controller.admin)
router.get('/moderator',authJwt.verifyToken,authRole.isModerator,controller.moderator)

module.exports = router;