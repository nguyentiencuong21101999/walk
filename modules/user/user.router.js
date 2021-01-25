const app = require('express');
const router = app.Router();
const authJwt = require('../auth_jwt/authJwt.middleware');
const authUser = require('./user.middleware')

const controller = require('../user/user.controller')
router.post('/',
authUser.validateGetUserByEmail,
controller.getUserByEmail
)
router.post('/signin',
authUser.validateSignin,
controller.signin
)
router.post('/signup',
authUser.validateSingup,
//authJwt.checkAccessToken,
controller.signup
)
router.post('/refreshToken',
authUser.validateRefreshToken,
authJwt.checkAccessToken,
authJwt.verifyRefreshToken,
controller.refreshToken
)
router.post('/signout',
authUser.validateSignout,
authJwt.checkAccessToken,
controller.signout)

router.post('/upload-avatar',
authUser.validateUploadAvatar,
authJwt.verifyAccessToken,
controller.uploadAvatar
)

router.post('/join-event/:event_id',
authUser.validateJoinEvent,
authJwt.verifyAccessToken,
controller.joinEvent)

router.get('/get-all-event-joined',
authJwt.verifyAccessToken,
controller.getAllEventJoined
)
module.exports = router;