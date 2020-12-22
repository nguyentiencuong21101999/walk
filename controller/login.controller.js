const query = require('../query');
const method = require('../DAO');
const jwt = require('jsonwebtoken');
const client = require('../helpers/init_redis');
const generator = require('../helpers/jwt.helper')
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
            const token = generator.generatorToken(decoded.strToken,process.env.TOKEN_SECRET,process.env.TOKEN_LIFE );
            res.json({
                accessToken: token
            })
        } else {
            res.send("err")
        }
    })
}

