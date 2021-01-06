const {ErrorCodeHandler} = require('../error_handle/error_handle')
const validate = (validation) =>{
        if(validation.error){
            return new ErrorCodeHandler(validation.error.details[0].message);
        }else{
           return 1;
        }    
}
module.exports = validate


