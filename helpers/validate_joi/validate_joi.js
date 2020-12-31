const {ErrorCodeHandler} = require('../error_handle/error_handle')
const validate = (req,res,next,validation) =>{
        if(validation.error){
            return res.json(new ErrorCodeHandler(validation.error.details[0].message))
        }else{
             next()
        }    
}
module.exports = validate


