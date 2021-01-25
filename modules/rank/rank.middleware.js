const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');
const validateGetRankByEvent = (req, res, next) => {
    try {
        const schemaParams = joi.object({
            event_id: joi.number().integer().required()
        })
        const validateHeaders = schemaParams.validate(req.params)
        validate(validateHeaders)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { validateGetRankByEvent }

