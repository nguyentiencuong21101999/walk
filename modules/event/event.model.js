
const procedure = require('../../database/query/db.query')
const event = {};

event.addEvent = async (
    name,
    detail_event,
    time_begin,
    time_end,
    steps_finish,
    point) => {
    const results = await procedure.sproc(
        "add_event", [
        name,
        detail_event,
        time_begin,
        time_end,
        steps_finish,
        point
    ])
    return results[0];
}
event.uploadImage = async (
    event_id,
    image) => {
    const results = await procedure.sproc("upload_image", [event_id, image]);
    return results[0];
}
event.allEvent = async() => {
    const results = await procedure.sproc("all_event", []);
    return results[0];
}
event.joinEvent = async(user_id,event_id) =>{
    const results = await procedure.sproc("join_event",[user_id,event_id])
    return results;
}
event.eventById = async(event_id) =>{
    const results = await procedure.sproc('get_event',[event_id])
    if(results[0].length > 0){
        return results[0];
    }
}

module.exports = event;