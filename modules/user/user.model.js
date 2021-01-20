
const procedure = require('../../database/query/db.query')
const user = {};
user.getInfoById = (id) =>{
   return procedure.sproc("get_info_by_id",[id]);
}
user.getUserByEmail = (email) => {
   return procedure.sproc("get_user_by_email", [email])
}

user.insertUser = (email, password, firstname, lastname, birthday, gender, phone, address_name,ward, district, province) => {
   return procedure.sproc("insert_user", [email, password, firstname, lastname, birthday, gender, phone,address_name, ward, district, province]);
}

user.uploadAvatarUser = (id, image) => {
   return procedure.sproc("uploadAvatarUser", [id, image])
}

user.getAllAddress = () => {
   return procedure.sproc("get_all_address",[])
}
module.exports = user;