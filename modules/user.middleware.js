const config = require('../configs/jwt.config')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/errorHandle/errorHandle')
const client = require("../helpers/redis/connectRedis")
const user = require('./user.modle')
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
/// store refresh tokens for manage
const storeRefreshToken = (refreshToken) => new Promise((resolve, reject) => {
    client.hset(REFRESH_TOKEN_HASH_KEY, refreshToken, '', (err, res) => {
        if (err) {
            reject(err)
            return
        }
        resolve(res)
    })
})
//del validate
const delRefreshToken = (refreshToken) => {
    client.hdel(REFRESH_TOKEN_HASH_KEY, refreshToken)
}
/// validate refresh token
const validateRefreshToken = (refreshToken) => new Promise((resolve, reject) => {
    client.hexists(REFRESH_TOKEN_HASH_KEY, refreshToken, (err, res) => {
        if (res === 1) { // valid
            resolve() // => then()
            console.log("1");
            return 
        }
        reject(err) // => cath()
        return
    })
})
const verifyRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    await validateRefreshToken(refreshToken)
        .then(
            jwt.verify(refreshToken, config.jwt.refreshTokenConfig.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (!decoded.id) {
                    res.json(new ErrorHandler(403, 'No refreshToken is valid.'))
                } else {
                    const user = {
                        id: decoded.id,
                        role: decoded.role,
                    }
                    // delRefreshToken(refreshToken);
                    delRefreshToken(refreshToken)
                    const generator = generatorToken(user);
                    storeRefreshToken(generator.refreshToken)
                    req.generator = generator;
                    next();
                }

            })
        )
        .catch(() => {
            res.json(new ErrorHandler(403, "refreshToken is not valid."))
        }

        )
}
const verifyToken = async (req, res, next) => {
    try {
        const token = getTokenFromHeader(req);
        if (!token) {
            res.json(new ErrorHandler(403, 'No token provided.'))
        }
        // check blacklist 
        await validateTokenIsNotInBlacklist(token);
        jwt.verify(token, config.jwt.accessToken.TOKEN_SECRET, (err, decoded) => {
            if (err || !decoded.payload.id) {
                res.send(new ErrorHandler(401, 'Unauthorized'))
            }
            user = {
                id: decoded.payload.id,
                role: decoded.payload.role

            }
            // req.userId = decoded.id
            // req.userRole = decoded.role
            req.user = user;
            next();
        });
    } catch (err) {
        next(err);
    }
}


const validateTokenIsNotInBlacklist = (token) => new Promise((resolve, reject) => {
    client.hexists(BLACKLIST_TOKEN_HASH_KEY, token, (err, res) => {
        if (res === 1) {
            reject(new ErrorHandler(ErrorCode.Unauthorized))
            return
        }
        resolve()
    })
})

const getTokenFromHeader = (req) => {
    let { token } = req.body
    if (!token) {
        res.json(new ErrorHandler(403, 'No token provided.'))
    }
    return token
}


module.exports = {
    generatorToken,
    storeRefreshToken,
    validateRefreshToken,
    verifyToken,
    verifyRefreshToken

}

