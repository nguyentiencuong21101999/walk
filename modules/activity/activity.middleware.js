const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');

const validateAdd = (req, res, next) => {
    try {
        const schemaBody = joi.object({
            steps_number: joi.number().integer().required(),
            time_begin: joi.date().iso().required(),
            time_end: joi.date().iso().required()
        })
        const validateBody = schemaBody.validate(req.body)
        validate(validateBody)
        next()
    } catch (err) {
        next(err)
    }
}
const validateGetActivity = (req, res, next) => {
    console.log(req.query);
    try {
        const schemaQuery = joi.object({
            type: joi.string().required()
        })
        const validateBody = schemaQuery.validate(req.query)
        validate(validateBody)
        next()
    } catch (err) {
        next(err)
    }
}
const validateGetActivityByEvent = (req, res, next) => {
    try {
     
        const schemaParams = joi.object({
            event_id: joi.number().integer().required()
        })
        const validateBody = schemaParams.validate(req.params)
        validate(validateBody)
        next()
    } catch (err) {
        next(err)
    }
}
module.exports = {
    validateAdd,
    validateGetActivity,
    validateGetActivityByEvent
};