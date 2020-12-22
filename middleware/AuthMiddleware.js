
const generator = require("../helpers/generatorToken/generatorToken")
const client = require('../helpers/redis/init_redis');
let isAuth = async(req,res,next) =>{
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(tokenFromClient);
    if (tokenFromClient) {
        try {
          const decoded = await generator.decodedToken(tokenFromClient,process.env.TOKEN_SECRET)
          const freshToken = generator.generatorToken(decoded.strToken, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE)
          const data = {
            token:tokenFromClient,
            refreshToken:freshToken
          }
          client.set('refreshToken', freshToken)
          req.data= data;
          next();
        } catch (error) {
          return res.status(401).json({
            message: 'Unauthorized.',
          });
        }
      } else {
        return res.status(403).send({
          message: 'No token provided.',
        });
      }
    }
    module.exports = {
        isAuth: isAuth,
      };