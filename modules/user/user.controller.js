
const userModel = require('./user.model')
const bcrypt = require('../../helpers/bcrypt/bcrypt')
const { successResponse, messageSuccessResponse } = require('../../helpers/response_handle/response_handle');
const authJwt = require('../auth_jwt/authJwt.middleware')
const authJwtType = require('../auth_jwt/authJwt.type')
const generator = require('../auth_jwt/authJwt.middleware');
const { ErrorHandler } = require('../../helpers/error_handle/error_handle')
const { upload_single } = require('../../multer/multer');
const { statusUser } = require('../../helpers/error_handle/status_code');




exports.getUserByEmail = async (req, res, next) => {
    const results = await userModel.getAllAddress();
    res.send(results[2])
    // const { email } = req.body;
    // //  const results = await userModel.getUserByEmail(email)
    // const results = await userModel.getUserByEmail(email);
    // if (results.err) {
    //     next(results.err)
    // }
    // res.json(new successResponse(results[0]))
}
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
         const results = await userModel.getProfile(email);
        const users = results[0]
        const info = results[1]
        const compare = await bcrypt.comparePassword(password, users[0].password)
        if (!compare) throw new ErrorHandler(statusUser.PasswordIsNotValid)
        const user = {
            id: users[0].user_id,
            role: users[0].role
        }
        const generator = authJwt.generatorToken(user)
        //store refreshToken
        authJwt.storeToken(generator.token, authJwtType.accessToken.key)
        authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key)
        res.json(new successResponse({
            info: info[0],
            accessToken: generator.token,
            refreshToken: generator.refreshToken,
        }))
    } catch (err) {
        next(err)
    }

}

exports.signup = async (req, res, next) => {
    const { email, password, firstname, lastname, birthday, gender, phone, address_name, ward, district, province } = req.body
    try {
        const hash = await bcrypt.hashPassword(password);
        const results = await userModel.insertUser(email, hash, firstname, lastname, birthday, gender, phone, address_name, ward, district, province)
        const users = results[0]
        const info = results[1]
        const user = {
            id: users[0].user_id,
            role: users[0].role
        }
        //restore
        const generator = authJwt.generatorToken(user);
        authJwt.storeToken(generator.token, authJwtType.accessToken.key);
        authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key);
        res.json(new successResponse({
            info: info[0],
            accessToken: generator.token,
            refreshToken: generator.refreshToken,
        }))
    } catch (err) {
        next(err)
    }
}

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body
    const token = req.headers.authorization;
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
    res.json(new successResponse(data));
}
exports.signout = async (req, res) => {
    const { refreshToken } = req.body;
    const token = req.headers.authorization;
    await authJwt.revokeToken(token, authJwtType.accessToken.key)
    await authJwt.revokeToken(refreshToken, authJwtType.refreshToken.key);
    res.json(
        new messageSuccessResponse(statusUser.successLogout)
    )
}

exports.uploadAvatar = async (req, res, next) => {
    const user_id = req.user.id;
    try {
        const avatar = await upload_single("fileImage", req, res, next)
        const filename = avatar.filename;
        const results = await userModel.uploadAvatar(user_id, filename);
        res.json(new successResponse(results[0]))
    } catch (err) {;
        next(err)
    }
}

exports.getAllEventJoined = async (req, res, next) => {
    const { id } = req.user;
    await userModel.getAllEventJoined(id)
        .then(results => {
            const event_joined = results[0];
            res.json(new successResponse(event_joined))
        })
        .catch(err =>
            next(err)
        )
}


