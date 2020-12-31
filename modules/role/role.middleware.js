const joi = require('joi')
const validate = require('../../helpers/validate_joi/validate_joi')
const { ErrorHandler, handleError } = require('../../helpers/error_handle/error_handle');

isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === 2) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Admin Role!'))
    }
}
isClient = (req, res, next) => {
    const user = req.user;
    if (user.role === 1) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Client Role!'))
    }
}

const vaidateToken = async (req, res, next) => {
    try{
        const schema = joi.object({
            token: joi.string().required()
        })
        const validation = schema.validate(req.body)
        await validate(req, res, next, validation)
    }catch{
        next(err)
    }

}

const authRole = {
    isAdmin: isAdmin,
    isClient: isClient,
    vaidateToken:vaidateToken

}
module.exports = authRole;