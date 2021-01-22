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
    },
    doesNotExits: {
        code: 403,
        message: "Token or refreshToken does not exits"
    }
}
const statusMulter = {
    uploadFail: {
        code: 403,
        message: "upload fail!"
    },
    isOnlyIamge: {
        code: 403,
        message: "Only image are allowed!"
    },
    chooseFile: {
        code: 403,
        message: "Select at least one file to upload!"
    }
}
const statusUser = {
    //error
    passwordIsNotValid:{
        code: 403,
        message: "email or password is not valid."
    }
    ,
    emailExits:{
        code: 403,
        message: "email exits!"
    },
    //join
    errorJoinEvent:{
        message:"Event Joined!"
    },
    joinEvent:{
        message:"Join Event Success ..."
    },
    eventNotValid:{
        message:"Event is not valid!"
    },
    //logout
    successLogout :{
        message:"logout success ..."
    },
    //uploadImage
    successUploadIamge : {
        message:"upload avatar success ..."
    }


}
const statusEvent = {
    //Success
    addEvent:{
        message:"Add success ..."
    }
   
}
module.exports = {
    statusError,
    statusJwt,
    statusMulter,
    statusUser,
    statusEvent
};

