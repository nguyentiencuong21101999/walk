const bcrypt = require('bcrypt');
const saltRounds = require('../../configs/bcrypt.config');
const {ErrorHandler} = require('../../helpers/errorHandle/errorHandle');

// hash
const hashPassword = async(password)=>{
    return bcrypt.hash(password, parseInt(saltRounds))
   
}
const comparePassword = (password,hashPassword) =>{
    return bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}