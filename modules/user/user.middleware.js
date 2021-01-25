const joi = require('joi')
const validate = require('../../helpers/validate_joi/validate_joi');
const validateGetUserByEmail = (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().lowercase().email().required()
        })
        const validates = schema.validate(req.body)
        validate(validates);
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
        validate(validates);
        next()

    } catch (err) {
        next(err)
    }
}

const validateSingup = async (req, res, next) => {
    try {
        const schema = joi.object({
            email: joi.string().lowercase().email().required(),
            password: joi.string().required(),
            firstname: joi.string().min(3).max(100).required(),
            lastname: joi.string().min(3).max(30).required(),
            birthday: joi.date().max('2003-01-18').iso().required(), // > 18 tuoi => theo fomat yy-mm-dd
            gender: joi.string().required(),
            phone: joi.string().min(10).max(10).required(),
            address_name: joi.string().required(),
            ward: joi.number().integer().required(),
            district: joi.number().integer().required(),
            province: joi.number().integer().required()

        })
        const validates = schema.validate(req.body)
        validate(validates);
        next()

    } catch (err) {
        next(err)
    }
}
const validateRefreshToken = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const schemaHeaders = joi.object({
            authorization: joi.string().required()
        })
        const schemaBody = joi.object({
            refreshToken: joi.string().required()
        })
        const validateHeaders = schemaHeaders.validate({ authorization: authorization })
        const validateBody = schemaBody.validate(req.body)
        validate(validateHeaders)
        validate(validateBody);
        next()

    } catch (err) {
        next(err)
    }
}
const validateSignout = (async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const schemaHeaders = joi.object({
            authorization: joi.string().required()
        })
        const schemaBody = joi.object({
            refreshToken: joi.string().required()
        })
        const validateHeaders = schemaHeaders.validate({ authorization: authorization })
        const validateBody = schemaBody.validate(req.body)
        validate(validateHeaders)
        validate(validateBody)
        next()
    } catch (err) {
        next(err)
    }
})
const validateUploadAvatar = (async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const schemaHeaders = joi.object({
            authorization: joi.string().required()
        })
        const validateHeaders = schemaHeaders.validate({ authorization: authorization })
        validate(validateHeaders)
        next()
    } catch (err) {
        next(err)
    }
}
)
const validateJoinEvent = ((req, res, next) => {
    try {
        const schemaParams = joi.object({
            event_id: joi.number().integer().required()
        })
        const validateBody = schemaParams.validate(req.params)
        validate(validateBody)
        next()
    }
    catch (err) {
        next(err)
    }
})
module.exports = {
    validateGetUserByEmail,
    validateSignin,
    validateSingup,
    validateRefreshToken,
    validateSignout,
    validateUploadAvatar,
    validateJoinEvent
}

