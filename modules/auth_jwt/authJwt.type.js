const config = require('../../configs/jwt.config');


module.exports = {
    accessToken: {
        key: 'access_token',
        secret: config.jwt.tokenConfig.TOKEN_SECRET
    },
    refreshToken: {
        key: 'refresh_token',
        secret: config.jwt.refreshTokenConfig.REFRESH_TOKEN_SECRET
    }
}