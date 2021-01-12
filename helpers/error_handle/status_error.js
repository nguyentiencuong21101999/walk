const statusError = {
    Oke: {
        code: 200,
        message: "oke"
    },
    BadRequest: {
        code: 400,
        message: "Bad Request"
    },
    Unauthorized: {
        code: 401,
        message: "Unauthorized"
    },
    Payment: {
        code: 401,
        message: "Payment Required"
    },
    Forbidden: {
        code: 403,
        message: "Forbidden "
    },
    NotFound: {
        code: 404,
        message: "Not Found "
    }
}
const statusJwt = {
    decodeFails: {
        code: 403,
        message: "Decode Failed!"
    },
    isValidToken: {
        code: 403,
        message: "Token is not valid!"
    },
    isValidRefreshToken: {
        code: 403,
        message: "refreshToken is not valid!"
    }
    ,
    expireToken: {
        code: 403,
        message: "Token expire!"
    }
}
const statusMulter = {
    uploadFail: {
        code: 403,
        message: "upload fail!"
    },
    isOnlyIamge:{
        code:403,
        message:"Only image are allowed!"
    }
}
module.exports = {
    statusError,
    statusJwt,
    statusMulter
};

