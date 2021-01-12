
const procedure = require('../../database/query/db.query')
const user = {};

user.getUserByEmail = (email) =>{
   return procedure.sproc("getUserByEmail",[email])
}

user.insertUser =(email,password,fistName,lastName,role) =>{
   return procedure.sproc("insertUser",[email,password,fistName,lastName,role]);
}

user.uploadAvatarUser =(id,image) =>{
   return procedure.sproc("uploadAvatarUser",[id,image])
}
module.exports = user;