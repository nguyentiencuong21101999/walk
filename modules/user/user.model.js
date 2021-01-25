
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
   return procedure.sproc("upload_avatar_user", [id, image])
}

user.getAllAddress = () => {
   return procedure.sproc("get_all_address",[])
}
// Join
user.joinEventUser = (user_id,event_id)=>{
   return procedure.sproc("join_event_user",[user_id,event_id]);
}
user.getUserEventByUserIdEventId =(user_id,event_id) =>{
   return procedure.sproc('get_user_event_by_userId_eventId',[user_id,event_id]);
}
user.getEventById =(event_id) =>{
   return procedure.sproc('get_event_by_id',[event_id])
}
//End Join
user.getAllEventJoined =(user_id)=>{
   return procedure.sproc("get_all_event_joined",[user_id]);
}

module.exports = user;