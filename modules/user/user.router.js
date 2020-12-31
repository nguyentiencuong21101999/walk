const app = require('express');
const router = app.Router();
const authJwt = require('../auth_jwt/authJwt.middleware');
const authUser = require('./user.middleware')

const controller = require('../user/user.controller')
router.post('/',
authUser.validateGetUserByEmail
,controller.getUserByEmail
)
router.post('/signin',
authUser.validateSignin,
controller.signin
)
router.post('/signup',
authUser.validateSingup,
authJwt.checkAccessToken,
controller.signup
)
router.post('/refreshToken',
authUser.validateRefreshToken,
authJwt.verifyRefreshToken,
controller.refreshToken
)
router.post('/signout',
authUser.validateSignout,
authJwt.checkAccessToken,
controller.signout)



module.exports = router;