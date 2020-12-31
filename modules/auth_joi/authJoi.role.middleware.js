const joi = require('joi')
const validate = require('../../helpers/validate_joi/validate_joi')
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

module.exports = {
    vaidateToken

}