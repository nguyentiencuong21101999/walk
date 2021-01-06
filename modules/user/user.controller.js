
const joi = require('joi')
const model = require('./user.model')
const bcrypt = require('../../helpers/bcrypt/bcrypt')
const { successResponse } = require('../../helpers/response_handle/response_handle');
const authJwt = require('../auth_jwt/authJwt.middleware')
const authJwtType = require('../auth_jwt/authJwt.type')
const querySql = require('../../database/query/db.query');
const generator = require('../auth_jwt/authJwt.middleware');
const { ErrorHandler, ErrorCodeHandler } = require('../../helpers/error_handle/error_handle')



module.exports.getUserByEmail = async (req, res, next) => {
    const { email } = req.body;

    querySql(model.getUserByEmail(email), (err, data) => {
        if (err) {
            next(err)
        }
        res.json(new successResponse(data[0]))
    }
    )
}
module.exports.signin = (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    querySql(model.getUserByEmail(email), async (err, data) => {
        if (err) {
            next(err)
        }
        if (data) {
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
                authJwt.storeToken(generator.token, authJwtType.accessToken.key)
                authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key)
                res.json({
                    info:info,
                    accessToken: generator.token,
                    refreshToken: generator.refreshToken,

                })
            } else {
                res.json(new ErrorCodeHandler("email or password is not valid."))
            }
        }

    })


}

module.exports.signup = async (req, res, next) => {
    const { email, password, fistName, lastName, role } = req.body
    const hash = await bcrypt.hashPassword(password);
    querySql(model.insertUser(email, hash, fistName, lastName, role), (err, data) => {
        if (err) {
            next(err)
        }
        const temp = data[0];
        const user = {};
        temp.map(value => {
            user.id = value.id;
            user.role =value.role;
        })
        const generator = authJwt.generatorToken(user);
        authJwt.storeToken(generator.token, authJwtType.accessToken.key);
        authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key);

        res.json(new successResponse(
            {
                info:user,
                accessToken : generator.token,
                refreshToken:generator.refreshToken
            }
        ));
    })
}

module.exports.refreshToken = async (req, res) => {
    const {token, refreshToken } = req.body
    const user = req.user;
    const generators = generator.generatorToken(user);
    await authJwt.revokeToken(token, authJwtType.accessToken.key);
    await authJwt.revokeToken(refreshToken, authJwtType.refreshToken.key);
   
    await authJwt.storeToken(generators.token, authJwtType.accessToken.key)
    await authJwt.storeToken(generators.refreshToken, authJwtType.refreshToken.key)
    const data = {
        newToken: generators.token,
        newRefreshToken: generators.refreshToken
    }
    // console.log(data);
    res.send(data)
}
module.exports.signout = async (req, res) => {
    const { refreshToken, token } = req.body;
    await authJwt.revokeToken(token, authJwtType.accessToken.key)
    await authJwt.revokeToken(refreshToken, authJwtType.refreshToken.key);
    res.json(
        { mesage: "logout success" }
    )
}