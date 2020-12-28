
const client = require('../helpers/redis/init_redis');
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle')
const config = require('../helpers/cofig.jwt/config_jwt_secret')
const jwt = require('jsonwebtoken')

const BLACKLIST_TOKEN_HASH_KEY = 'blacklist_token_hash' // => danh sách tài khoản bị cấm


//verifyToken || check Token
const verifyToken = async (req, res, next) => {
  try {
      const token = getTokenFromHeader(req);
      if (!token) {
        res.json(new ErrorHandler(403,'No token provided.'))
      }
      // check blacklist 
      await validateTokenIsNotInBlacklist(token);
      jwt.verify(token, config.jwt.accessToken.TOKEN_SECRET, (err, decoded) => {
          if (err || !decoded.payload.id) {
            res.send(new ErrorHandler(401,'Unauthorized'))
          }
          user ={
            id:decoded.payload.id,
            role:decoded.payload.role

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
//verifyRefreshToken || check RefreshTOken
const verifyRefreshToken = async (req, res, next) => {
  try {
      const { refreshToken } = req.body
      jwt.verify(refreshToken, config.jwt.refreshToken.REFRESH_TOKEN_SECRET, (err, decoded) => {
        console.log(decoded.payload.id);
          if (err || !decoded.payload.id) {
            res.json(new ErrorHandler(403,'No refreshToken provided.'))
          }
          user ={
            id:decoded.payload.id,
            role:decoded.payload.role,
            refreshToken:refreshToken
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

//Sign Token
const sign = (user,  secret, expireTime) => { 
  const payload = {
      id: user.id,
      role: user.role,
  }
  const token = jwt.sign({payload}, secret,{ expiresIn:expireTime})
  return token
}
//decoded Token
const decodeToken = (token) => jwt.decode(token, { complete: true })


// add token blacklist
const addTokenToBlackList = (req, res, next) => {
  try {

      const token = getTokenFromHeader(req)
      if (token == null) {
          throw new ErrorHandler(ErrorCode.Unauthorized)
      }
      client.hset(BLACKLIST_TOKEN_HASH_KEY, token, '', () => {
          next()
      })

  } catch (err) {
      next(err)
  }

}
/// check if token is valid (nếu tài khoản nằm trong danh sách cấm thì return err => next())
const validateTokenIsNotInBlacklist = (token) => new Promise((resolve, reject) => {
  client.hexists(BLACKLIST_TOKEN_HASH_KEY, token, (err, res) => {
    console.log(res);
      if (res === 1) {
          reject(new ErrorHandler(ErrorCode.Unauthorized))
          return
      }
      resolve()
  })
})

const getTokenFromHeader = (req) => {
  let {token} = req.body
  if (!token) {
     res.json(new ErrorHandler(403,'No token provided.'))
  }
  return token
}
module.exports = {
  sign,
  decodeToken,
  verifyToken,
  verifyRefreshToken,
  addTokenToBlackList,
};