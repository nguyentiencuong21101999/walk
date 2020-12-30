
const user = {};

user.getUserByEmail = (email) =>{
   return `CALL getUserByEmail('${email}')` 
}

user.insertUser =(email,password,fistName,lastName,role) =>{
   return `CALL insertUser('${email}','${password}','${fistName}','${lastName}','${role}')`
}
module.exports = user;