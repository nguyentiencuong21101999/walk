const { statusUser } = require('../../helpers/error_handle/status_code')
const procedure = require('../../database/query/db.query');
const { ErrorHandler } = require('../../helpers/error_handle/error_handle');
const user = {};
user.getInfoById = (id) => {
   return procedure.sproc("get_info_by_id", [id]);
}
user.getProfile = async (
   email
) => {
   const results = await procedure.sproc("get_profile", [email])
   if (results.length > 0) {
      return results;
   }

}
user.insertUser = async (
   email,
   password,
   firstname,
   lastname,
   birthday,
   gender,
   phone,
   address_name,
   ward, district,
   province) => {
   const results = await procedure.sproc("insert_user", [email, password, firstname, lastname, birthday, gender, phone, address_name, ward, district, province]);
   if (results.length > 0) {
      return results;
   }
}
user.uploadAvatar = async (
   user_id,
   image) => {
   const results = await procedure.sproc("upload_avatar", [user_id, image])
   return results;

}
//End Join
user.getAllEventJoined = (user_id) => {
   return procedure.sproc("get_all_event_joined", [user_id]);
}

module.exports = user;