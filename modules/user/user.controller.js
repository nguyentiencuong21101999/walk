const model = require('./user.model')
const bcrypt = require('../../helpers/bcrypt/bcrypt')
const { successResponse } = require('../../helpers/response_handle/response_handle');
const authJwt = require('../auth_jwt/authJwt.middleware')
const authJwtType = require('../auth_jwt/authJwt.type')
const querySql = require('../../database/query/db.query');
const generator = require('../auth_jwt/authJwt.middleware');
const { auth } = require('../../helpers/redis/connect_redis');

module.exports.getUserByEmail = (req, res, next) => {
    const { email } = req.body;
    querySql(model.getUserByEmail(email), (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json(new successResponse(data[0]))
    })


}
module.exports.signin = (req, res, next) => {
    const { email, password } = req.body;
    querySql(model.getUserByEmail(email), async (err, data) => {
        if (err) {
            next(err)
        }
        let info = {};
        data[0].map((value, key) => {
            info = value
        })
        const user = {
            id: info.id,
            role: info.role
        }
        const compare = await bcrypt.comparePassword(password, info.password)
        if (compare === true) {
            const generator = authJwt.generatorToken(user)
            //store refreshToken
            authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key)
            res.json({
                accessToken: generator.token,
                refreshToken: generator.refreshToken
            })
        }
    })


}

module.exports.signup = async (req, res, next) => {
    console.log(req.body);
    const { email, password, fistName, lastName, role } = req.body;
    const hash = await bcrypt.hashPassword(password);
    querySql(model.insertUser(email, hash, fistName, lastName, role), (err, data) => {
        if (err) {
            next(err)
        }
        res.json(new successResponse(data));
    })
}

module.exports.refreshToken = async(req, res) => {
    const { refreshToken } = req.body
    const user = req.user;
    const generators = generator.generatorToken(user);
    await authJwt.revokeToken(refreshToken, authJwtType.refreshToken.key)
    await authJwt.storeToken(generators.refreshToken, authJwtType.refreshToken.key)
    const data = {
        newToken: generators.token,
        newRefreshToken: generators.refreshToken
    }
    // console.log(data);
    res.send(data)
}
module.exports.signout = async(req,res) =>{
    const {refreshToken} = req.body;
    await authJwt.revokeToken(refreshToken,authJwtType.refreshToken.key);
    res.json(
        {mesage:"logout success"}
        )
}