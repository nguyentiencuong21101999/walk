const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');
const validateAdd = async (req, res, next) => {
        try {
            const schemaHeaders = joi.object({
                name: joi.string().required(),
                detail_event: joi.string().required(),
                time_begin: joi.date().iso().required(),
                time_end: joi.date().iso().required(),
                steps_finish: joi.number().integer().required(),
                point: joi.number().integer().required(),
            })
            const validateHeaders = schemaHeaders.validate(req.body)
            validate(validateHeaders)
            next()
        } catch (err) {
            next(err)
        }
}
const validateUploadImage = (req,res,next) =>{
    try {
        const schemaPrams = joi.object({
           event_id:joi.number().integer().required()
        })
          
        const validateHeaders = schemaPrams.validate(req.params)
        validate(validateHeaders)
        
        next()

    } catch (err) {
        next(err)
    }
}
const validateGetAllEvent = ((req, res, next) => {
    try {
        const schemaQuery = joi.object({
            page: joi.number().integer().required(),
            limit: joi.number().integer().required()
        })
        const validateBody = schemaQuery.validate(req.query)
        validate(validateBody)
        next()
    }
    catch (err) {
        next(err)
    }
})

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
    validateAdd,
    validateUploadImage,
    validateGetAllEvent,
    validateJoinEvent
}