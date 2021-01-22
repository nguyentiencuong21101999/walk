const joi = require("joi")
const validate = require('../../helpers/validate_joi/validate_joi');

const validateAdd =(req,res,next)=>{
    try{
        const schemaBody = joi.object({
            steps_number:joi.number().integer().required(),
            time_begin:joi.date().iso().required(),
            time_end:joi.date().iso().required()
        })
        const validateBody = schemaBody.validate(req.body)
        validate(validateBody)
        next()
    }catch(err){
        next(err)
    }


}
module.exports = {
    validateAdd
};