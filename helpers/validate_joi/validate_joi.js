const {ErrorCodeHandler} = require('../error_handle/error_handle')
const validate = (validation) =>{
        if(validation.error){
            return res.json(new ErrorCodeHandler(validation.error.details[0].message))
        }else{
           return null;
        }    
}
module.exports = validate


