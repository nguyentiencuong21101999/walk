const query = require('../query');
const method = require('../DAO');
const client = require('../helpers/redis/init_redis');
const generator = require('../helpers/generatorToken/generatorToken')
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle');
const { decode } = require('jsonwebtoken');
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

                    const token = generator.generatorToken(
                        strToken,
                        process.env.TOKEN_SECRET,
                        process.env.TOKEN_LIFE
                    );
                    const refreshToken = generator.generatorToken(
                        strToken,
                        process.env.REFRESH_TOKEN_SECRET,
                        process.env.REFRESH_TOKEN_LIFE
                    );
                    //push refreshTOken name: refreshToken:user${id}:${refreshToken}
                    const id = strToken.id
                    
                    client.hmset(`refreshToken:user${id}:${refreshToken}`, 'token', token, "refreshTokne", refreshToken)
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
    const { refreshToken } = req.body;
    const decoded = generator.decodedToken(refreshToken,process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE)
    const id  = decoded.strToken.id
    // lấy refreshToken theo id + mã refreshToken
     client.hgetall(`refreshToken:user${id}:${refreshToken}`, (err, data) => {
                        if(data){
                            // nếu có tạo new token + refresh
                            const newToken = generator.generatorToken(decoded.strToken,process.env.TOKEN_SECRET,process.env.TOKEN_LIFE)
                            const newRefreshToken = generator.generatorToken(decoded.strToken,process.env.REFRESH_TOKEN_SECRET,process.env.REFRESH_TOKEN_LIFE)

                            // xóa refresh cũ 
                            client.del(`refreshToken:user${id}:${refreshToken}`)
                            // push refresh mới lên
                            client.hmset(`refreshToken:user${id}:${newRefreshToken}`,'token', newToken, "refreshTokne", newRefreshToken)
                            res.json({
                                newToken:newToken,
                                newRefreshToken:newRefreshToken
                            })
                        }else{
                            res.send(new ErrorHandler(403,'refreshToken not invalid.'))
                        }
                    })
}

