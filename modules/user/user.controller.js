
const userModel = require('./user.model')
const bcrypt = require('../../helpers/bcrypt/bcrypt')
const { successResponse, messageSuccessResponse } = require('../../helpers/response_handle/response_handle');
const authJwt = require('../auth_jwt/authJwt.middleware')
const authJwtType = require('../auth_jwt/authJwt.type')
const generator = require('../auth_jwt/authJwt.middleware');
const { ErrorHandler } = require('../../helpers/error_handle/error_handle')
const { upload_single } = require('../../multer/multer');
const { statusUser } = require('../../helpers/error_handle/status_code');




module.exports.getUserByEmail = async (req, res, next) => {
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

module.exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const results = await userModel.getUserByEmail(email)
        console.log(results);
    } catch (err) {
        next(err) 
    }
    // const { email, password } = req.body;
    // userModel.getUserByEmail(email)
    //     .then(async results => {
    //         let info = {};
    //         results[0].map((value, key) => {
    //             info = value
    //         })
    //         const user = {
    //             id: info.user_id,
    //             role: info.role
    //         }
    //         const compare = await bcrypt.comparePassword(password, info.password)
    //         if (compare === true) {
    //             const generator = authJwt.generatorToken(user)
    //             let info_address = []
    //             await userModel.getInfoById(user.id)
    //                 .then(results => {

    //                     const user_info = results[0];
    //                     const address = results[1];
    //                     user_info[0].address = address[0]
    //                     info_address = user_info[0]
    //                 })
    //                 .catch(err =>
    //                     next(err)
    //                 )
    //             //store refreshToken
    //             authJwt.storeToken(generator.token, authJwtType.accessToken.key)
    //             authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key)
    //             res.json({
    //                 info: info_address,
    //                 accessToken: generator.token,
    //                 refreshToken: generator.refreshToken,
    //             })

    //         } else {
    //             res.json(new ErrorHandler(statusUser.passwordIsNotValid))
    //         }
    //     })
    //     .catch(err =>
    //         next(err)
    //     )

    // console.log(results);



}

module.exports.signup = async (req, res, next) => {
    const { email, password, firstname, lastname, birthday, gender, phone, address_name, ward, district, province } = req.body
    const hash = await bcrypt.hashPassword(password);

    userModel.getUserByEmail(email)
        .then(results => {
            if (results[0].length > 0) {
                next(new ErrorHandler(statusUser.emailExits))
            } else {
                userModel.insertUser(email, hash, firstname, lastname, birthday, gender, phone, address_name, ward, district, province)
                    .then(
                        results => {
                            const info = results[0];
                            const address = results[1];

                            info[0].address = address[0];

                            const user = {
                                id: info[0].user_id,
                                role: info[0].role
                            };
                            const generator = authJwt.generatorToken(user);
                            authJwt.storeToken(generator.token, authJwtType.accessToken.key);
                            authJwt.storeToken(generator.refreshToken, authJwtType.refreshToken.key);

                            res.json(new successResponse(
                                {
                                    info: info[0],
                                    accessToken: generator.token,
                                    refreshToken: generator.refreshToken
                                }
                            ));

                        })
                    .catch(err =>
                        next(err)
                    )
            }
        })
        .catch(err =>
            next(err)
        )




}

module.exports.refreshToken = async (req, res) => {
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
module.exports.signout = async (req, res) => {
    const { refreshToken } = req.body;
    const token = req.headers.authorization;
    await authJwt.revokeToken(token, authJwtType.accessToken.key)
    await authJwt.revokeToken(refreshToken, authJwtType.refreshToken.key);
    res.json(
        new messageSuccessResponse(statusUser.successLogout)
    )
}

module.exports.uploadAvatar = async (req, res, next) => {
    const { id } = req.user;
    await upload_single("fileImage", req, res, next)
        .then(
            async (avatar) => {
                await userModel.uploadAvatarUser(id, avatar.filename)
                    .then(results => {
                        res.json(
                            new successResponse({ filename: avatar.filename }, statusUser.successUploadIamge.message
                            ))
                    })
                    .catch(err =>
                        next(err)
                    )
            }
        )
        .catch(
            err => next(err)
        )
}
module.exports.joinEvent = async (req, res, next) => {
    const user_id = req.user.id;
    const { event_id } = req.params;
    userModel.getEventById(event_id)  // kiem tra xem co event nay` k
        .then(results => {
            if (results[0].length > 0) {
                userModel.getUserEventByUserIdEventId(user_id, event_id) //kiem tra xem da join chuwa
                    .then(results => {
                        if (results[0].length == 0) {
                            userModel.joinEventUser(user_id, event_id)
                                .then(results => {
                                    res.json(new messageSuccessResponse(statusUser.joinEvent))
                                })
                                .catch(err => {
                                    next(err)
                                })
                        }
                        else {
                            next(new ErrorHandler(statusUser.errorJoinEvent))
                        }
                    })
                    .catch(err =>
                        next(err))
            }
            else {
                next(new ErrorHandler(statusUser.eventNotValid))
            }
        })
        .catch(err =>
            next(err))
}
module.exports.getAllEventJoined = async (req, res, next) => {
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


