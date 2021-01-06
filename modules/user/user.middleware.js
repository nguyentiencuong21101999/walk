const joi = require('joi')
const validate = require('../../helpers/validate_joi/validate_joi');
const { ErrorCodeHandler } = require('../../helpers/error_handle/error_handle')

const validateGetUserByEmail = (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().lowercase().email().required()
        })
        const validates = schema.validate(req.body)
        let validation = validate(validates);
        if (validation !== 1) {
            res.json(validation)
        }
        next()
    } catch (err) {
        next(err)
    }


}
const validateSignin = async (req, res, next) => {

    try {
        const schema = joi.object({
            email: joi.string().lowercase().email().required(),
            password: joi.string().required()
        })
        const validates = schema.validate(req.body)
        let validation = validate(validates);
        if (validation !== 1) {
            res.json(validation)
        }
        next()

    } catch {
        next(err)
    }

}

const validateSingup = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().lowercase().email().required(),
            password: joi.string().required(),
            fistName: joi.string().min(5).max(100).required(),
            lastName: joi.string().min(5).max(30).required(),
            role: joi.string().required()

        })
        const validates = schema.validate(req.body)
        let validation = validate(validates);
        if (validation !== 1) {
            res.json(validation) 
        }
        next()

    } catch (err) {
        next(err)
    }
}
const validateRefreshToken = async (req, res, next) => {
    try {
        const schema = joi.object({
            token: joi.string().required(),
            refreshToken: joi.string().required()
        })
        const validates = schema.validate(req.body)
        let validation = validate(validates);
        if (validation !== 1) {
            res.json(validation) 
        }
        next()
       
    } catch {
        next(err)
    }


}
const validateSignout = (async (req, res, next) => {
    try {
        const schema = joi.object({
            token: joi.string().required(),
            refreshToken: joi.string().required()
        })
        const validates = schema.validate(req.body)
        let validation = validate(validates);
        if (validation !== 1) {
            res.json(validation) 
        }
        next()
    } catch (err) {
        next(err)
    }
})
module.exports = {
    validateGetUserByEmail,
    validateSignin,
    validateSingup,
    validateRefreshToken,
    validateSignout
}

