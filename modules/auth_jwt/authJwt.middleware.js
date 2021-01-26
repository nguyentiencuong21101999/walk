const config = require('../../configs/jwt.config')
const jwt = require('jsonwebtoken')
const { ErrorHandler, handleError } = require('../../helpers/error_handle/error_handle')
const { statusError, statusJwt } = require('../../helpers/error_handle/status_code')
const client = require("../../helpers/redis/connect_redis")
const authJwtType = require('./authJwt.type')

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
            reject(err)
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
        throw new ErrorHandler(statusJwt.decodeFails)
    }
    client.hexists(key, userId, async (err, reply) => {
        if (reply === 1) {
            const currentToken = await getStoredToken(key, userId)
            return resolve(currentToken.has(token))
        }
        reject(new ErrorHandler(statusJwt.doesNotExits))
    })

})

//check isValid
const verifyAccessToken = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req)
        const isValid = await validateToken(token, authJwtType.accessToken.key)
        if (!token || !isValid) {
            throw new ErrorHandler(statusJwt.isValidToken)
        }
        //check expire
        await jwt.verify(token, authJwtType.accessToken.secret, (err, decodedToken) => {
            if (decodedToken) {
                const user = {
                    id: decodedToken.id,
                    role: decodedToken.role
                }
                req.user = user;
                return next()
            } else {
                throw new ErrorHandler(statusJwt.expireToken)
            }
        })
    } catch (err) {
        next(err)
    }

}

const verifyRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        //if validateTken  return false <=> khong cos tren redis
        const isValid = await validateToken(refreshToken, authJwtType.refreshToken.key)
        if (!isValid) {
            throw new ErrorHandler(statusJwt.isValidRefreshToken)
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
            throw new ErrorHandler(statusJwt.decodeFails)
        }
        // validateToken  retunr true <=> co tren redis
    } catch (err) {
        next(err);
    }

}
const revokeToken = async (token, key) => {
    const decodedToken = decodeToken(token)
    const userId = decodedToken && decodedToken.id
    const currentTokens = await getStoredToken(key, userId)
    currentTokens.delete(token)
    client.hset(key, userId, [...currentTokens].join(','))

}
const checkAccessToken = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req)
        jwt.verify(token, authJwtType.accessToken.secret, (err, decodedToken) => {
            if (err) {
                throw new ErrorHandler(statusJwt.isValidToken)
            }
            const user = {
                id: decodedToken.id,
                role: decodedToken.role
            }
            req.user = user;
            next()


        })
    } catch (err) {
        next(err)
    }

}
const getTokenFromHeader = (req) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new ErrorHandler(statusError.Unauthorized)
    }
    return token
}
const decodeToken = (token) => jwt.decode(token)
module.exports = {
    generatorToken,
    storeToken,
    revokeToken,
    verifyAccessToken,
    verifyRefreshToken,
    checkAccessToken
}

