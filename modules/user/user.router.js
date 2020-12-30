const app = require('express');
const { auth } = require('../../helpers/redis/connect_redis');
const router = app.Router();
const authJwt = require('../auth_jwt/authJwt.middleware')

const controller = require('../user/user.controller')
router.post('/',
controller.getUserByEmail
)
router.post('/signin',
controller.signin
)
router.post('/signup',
controller.signup
)
router.post('/refreshToken',
authJwt.verifyRefreshToken,
controller.refreshToken
)
router.post('/signout',
authJwt.checkAccessToken,
controller.signout)



module.exports = router;