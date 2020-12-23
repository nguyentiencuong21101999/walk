const query = require('../query');
const method = require('../DAO');
const jwt = require('jsonwebtoken');
const client = require('../helpers/redis/init_redis');
const generator = require('../helpers/generatorToken/generatorToken')
require = ('../helpers/init_redis.js')


module.exports.login = (req, res, next) => {
    let { username, password } = req.body;
    query(method.LOGIN, [username, password],
        (err, data) => {
            if (err) {
                next(err)
            } else {
                if (data.length <= 0) {
                    res.json({
                        accessToken: null,
                        message: "Invalid Username and Password"
                    })
                }
                else {
                    let strToken;
                    data.map((value, key) => {
                        strToken = value
                    })
                    
                    const token = generator.generatorToken(strToken, process.env.TOKEN_SECRET, process.env.TOKEN_LIFE);
                    const refreshToken = generator.generatorToken(strToken, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);
                    
                    let account =[{
                        account1: [
                            {
                                user: {
                               accesstoken:token,
                               refreshtoken:refreshToken
                                }
                            }
                          ]
                    }] 
                      
                    // client.set("account",)
              
                    //push redis
                    client.set("refreshToken", refreshToken);

                    res.json({
                        accessToken: token,
                        refresh_token: refreshToken,
                        info: strToken
                    })
                }

            }
        })

}
module.exports.refreshToken = (req, res, next) => {
    const {refreshToken } = req.body;
    client.get("refreshToken", (err, reply) => {
        // console.log(reply)
        if (refreshToken && refreshToken === reply) {
            const decoded = generator.decodedToken(reply,process.env.REFRESH_TOKEN_SECRET);
            const newToken = generator.generatorToken(decoded.strToken,process.env.TOKEN_SECRET,process.env.TOKEN_LIFE );
            const newRefreshToken = generator.generatorToken(decoded.strToken,process.env.REFRESH_TOKEN_SECRET,process.env.REFRESH_TOKEN_LIFE );
            //addrefresh
            client.set("refreshToken",newRefreshToken)
            res.json({
                newToken: newToken,
                newRefreshToken:newRefreshToken

            })
        } else {
            res.send("err")
        }
    })
}

