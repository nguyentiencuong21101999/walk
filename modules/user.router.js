const app = require('express');
const router = app.Router();
const authJwt = require('./user.middleware')

const controller = require('./user.controller')
router.post('/',controller.getUserByEmail)
router.post('/signin',controller.signin )
router.post('/signup',controller.signup)
router.post('/refreshToken',
authJwt.verifyRefreshToken,
controller.refreshToken
)


module.exports = router;