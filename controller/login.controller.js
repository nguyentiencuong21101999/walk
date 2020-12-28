const query = require('../query');
const method = require('../DAO');
const client = require('../helpers/redis/init_redis');
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle');
const config = require('../helpers/cofig.jwt/config_jwt_secret')
const authJwt = require('../middleware/AuthJwt');
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
                    let user;
                    data.map((value, key) => {
                        user = {
                            id: value.id,
                            role: value.role,
                        }
                    })
                    console.log(user);

                    const token = authJwt.sign(
                        user,
                        config.jwt.accessToken.TOKEN_SECRET,
                        config.jwt.accessToken.TOKEN_LIFE
                    )


                    const refreshToken = authJwt.sign(
                        user,
                        config.jwt.refreshToken.REFRESH_TOKEN_SECRET,
                        config.jwt.refreshToken.REFRESH_TOKEN_LIFE
                    );
                    
                    //push refreshTOken name: refreshToken:user${id}:${refreshToken}
                    const id = user.id
                    client.hmset(`refreshToken:user${id}:${refreshToken}`, 'token', token, "refreshTokne", refreshToken)
                    res.json({
                        accessToken: token,
                        refresh_token: refreshToken,
                        info: user
                    })
                }

            }
        })

}
module.exports.refreshToken = (req, res, next) => {
    console.log(req.user);
    const { refreshToken,id,role } = req.user;
  const user ={
      id:id,
      role:role
  }
  console.log(id);
  console.log(refreshToken);
   // lấy refreshToken theo id + mã refreshToken
    client.hgetall(`refreshToken:user${id}:${refreshToken}`, (err, data) => {
        if (data) {
            // nếu có tạo new token + refresh
            const newToken = authJwt.sign(
                user,
                config.jwt.accessToken.TOKEN_SECRET, 
                config.jwt.accessToken.TOKEN_LIFE
                
                )
            const newRefreshToken = authJwt.sign(
                user,
                config.jwt.refreshToken.REFRESH_TOKEN_SECRET, 
                config.jwt.refreshToken.REFRESH_TOKEN_LIFE
                )

            // xóa refresh cũ 
            client.del(`refreshToken:user${id}:${refreshToken}`)
            // push refresh mới lên
            client.hmset(`refreshToken:user${id}:${newRefreshToken}`, 'token', newToken, "refreshTokne", newRefreshToken)
            res.json({
                newToken: newToken,
                newRefreshToken: newRefreshToken
            })
        } else {
            res.send(new ErrorHandler(403, 'refreshToken not invalid.'))
        }
    })
}

