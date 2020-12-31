const app = require('express');
const router = app.Router();
const authJwt = require('../auth_jwt/authJwt.middleware');
const authJoi = require('../auth_joi/authJoi.user.middleware')

const controller = require('../user/user.controller')
router.post('/',
authJoi.validateGetUserByEmail
,controller.getUserByEmail
)
router.post('/signin',
authJoi.validateSignin,
controller.signin
)
router.post('/signup',
authJoi.validateSingup,
authJwt.checkAccessToken,
controller.signup
)
router.post('/refreshToken',
authJoi.validateRefreshToken,
authJwt.verifyRefreshToken,
controller.refreshToken
)
router.post('/signout',
authJoi.validateSignout,
authJwt.checkAccessToken,
controller.signout)



module.exports = router;