
const procedure = require('../../database/query/db.query')
const event ={};

event.addEvent =(name,detail_event,time_begin,time_end,steps_finish,point)=>{
    return procedure.sproc("add_event",[name,detail_event,time_begin,time_end,steps_finish,point])
}
event.uploadImageEvent = (event_id,image) =>{
    return procedure.sproc("upload_image_event",[event_id,image]);
}
event.getAllEvent =() =>{
    return procedure.sproc("get_all_event",[]);
}

module.exports = event;