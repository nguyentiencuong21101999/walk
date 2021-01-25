const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');
const validateAdd = async (req, res, next) => {
        try {
            const schemaHeaders = joi.object({
                name: joi.string().required(),
                detail_event: joi.string().required(),
                time_begin: joi.date().min(new Date()).iso().required(),
                time_end: joi.date().min(new Date()).iso().required(),
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
const validateUploadImageEvent = (req,res,next) =>{
    try {
        const schemaPrams = joi.object({
           id:joi.number().integer().required()
        })
          
        const validateHeaders = schemaPrams.validate(req.params)
        validate(validateHeaders)
        
        next()

    } catch (err) {
        next(err)
    }
}
module.exports = {
    validateAdd,
    validateUploadImageEvent
}