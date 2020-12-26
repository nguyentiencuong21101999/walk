
const generator = require("../helpers/generatorToken/generatorToken")
const client = require('../helpers/redis/init_redis');
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle')
//Check Token
let isCheckToken = async (req, res, next) => {
  const {token} = req.body;
  if (token) {
        const tokens = token;
        req.token = tokens;
        next();
  } else {
    res.send(new ErrorHandler(403,'No token provided.'))
  }

}
//Check Hop Le
let isAuth = async (req, res, next) => {
  const tokenFromClient = req.token;
  try {
    const decoded = await generator.decodedToken(tokenFromClient, process.env.TOKEN_SECRET)
    const data = {
      token: tokenFromClient,
      info:decoded
    }
    req.data = data;
    next();
  }catch (error) {
    res.send(new ErrorHandler(401,'Unauthorized'))
    
  }
}
module.exports = {
  isCheckToken:isCheckToken,
  isAuth: isAuth
};