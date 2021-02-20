const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');
const validateGetRank = (req, res, next) => {
    console.log(req.query);
    try {
        const schemaQuery = joi.object({
            type: joi.string().required(),
            page: joi.number().integer().required(),
            limit: joi.number().integer().required(),
        })
        const validateHeaders = schemaQuery.validate(req.query)
        validate(validateHeaders)
        next()
    } catch (err) {
        next(err)
    }
}
const validateGetRankByEvent = (req, res, next) => {
    const { event_id } = req.params;
    const {page,limit} = req.query;
    const obj = {
        event_id,
        page,
        limit
    }
    try {
        const schemaParams = joi.object({
            event_id: joi.number().integer().required(),
            page:joi.number().integer().required(),
            limit:joi.number().integer().required(),
        })

        const validateHeaders = schemaParams.validate(obj)
        validate(validateHeaders)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateGetRank,
    validateGetRankByEvent
}

