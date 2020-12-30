const config = require('../../configs/jwt.config')
const jwt = require('jsonwebtoken')
const { ErrorHandler, handleError } = require('../../helpers/error_handle/errorHandle')
const client = require("../../helpers/redis/connect_redis")
const authJwtType = require('../auth_jwt/authJwt.type')
const { user } = require('../../database/configs/db.config')
const { set } = require('../../helpers/redis/connect_redis')
const BLACKLIST_TOKEN_HASH_KEY = 'blacklist_token_hash'
const REFRESH_TOKEN_HASH_KEY = 'refresh_token_hash'
const generatorToken = (user) => {

    const token = jwt.sign(
        user,
        config.jwt.tokenConfig.TOKEN_SECRET,
        { expiresIn: config.jwt.tokenConfig.TOKEN_LIFE }
    );

    const refreshToken = jwt.sign(user,
        config.jwt.refreshTokenConfig.REFRESH_TOKEN_SECRET,
        { expiresIn: config.jwt.refreshTokenConfig.REFRESH_TOKEN_LIFE }
    )
    return {
        token,
        refreshToken
    }
}
//
const getStoredToken = (key, userId) => new Promise((resolve, reject) => {
    client.hget(key, userId, (err, tokens) => {
        if (err) {
            return reject(err)
        }
        resolve(tokens === null ? new Set() : new Set(tokens.split(',')))
    })

})

const storeToken = async (token, key) => {

    const decodedToken = decodeToken(token)
    const userId = decodedToken && decodedToken.id

    if (!userId) res.json(ErrorHandler(403, "token is not valid"))
    const currentTokens = await getStoredToken(key, userId)

    currentTokens.add(token)
    client.hset(key, userId, [...currentTokens].join(','))

}
/** 
 * Return true if user token existed // check refreshToken tren redis
*/
const validateToken = (token, key) => new Promise((resolve, reject) => {

    const decodedToken = decodeToken(token)
    const userId = decodedToken && decodedToken.id

    if (!userId) {
        res.json(new ErrorHandler(403, "DecodeTokenFailed"));
    }
    const result = client.hexists(key, userId, async (err, reply) => {
        if (reply === 1) {
            const currentToken = await getStoredToken(key, userId)
            return resolve(currentToken.has(token))
        }
        reject(err)
    })

})



const verifyRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        //if validateTken  return false <=> khong cos tren redis
        const isValid = await validateToken(refreshToken, authJwtType.refreshToken.key)
        
        if (!isValid) {
            res.json(new ErrorHandler(403, "InvalidRefreshToken"))

        } else {
            const decodedToken = jwt.verify(refreshToken, authJwtType.refreshToken.secret)
            if (decodedToken) {
                const user = {
                    id: decodedToken.id,
                    role: decodedToken.role
                }
                req.user = user;
                return next();
            }
        }
        // validateToken  retunr true <=> co tren redis

        // res.json(new ErrorHandler(403,"DecodeTokenFailed"));
    } catch (err) {
        next(err);
    }

}
const revokeToken = async (token, key) => {
    const decodedToken = decodeToken(token)
    const userId = decodedToken && decodedToken.id
    const currentTokens = await getStoredToken(key, userId)
    currentTokens.delete(token)
    // console.log(currentTokens.delete(token));
    // console.log([...currentTokens].join(','));
 
    client.hset(key, userId, [...currentTokens].join(','))

}
const checkAccessToken = async (req, res, next) => {

    try {
        const token = getTokenFromHeader(req)
        const decodedToken = jwt.verify(token, authJwtType.accessToken.secret)
        req.userId = decodedToken.id
        req.userRole = decodedToken.role
        next()

    } catch (err) {
        next()
    }

}
const getTokenFromHeader = (req) => {
    let { token } = req.body
    if (!token) {
        res.json(new ErrorHandler(403, 'No token provided.'))
    }
    return token
}
const decodeToken = (token) => jwt.decode(token)
module.exports = {
    generatorToken,
    storeToken,
    revokeToken,
    verifyRefreshToken,
    checkAccessToken
}

