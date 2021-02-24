
const procedure = require('../../database/query/db.query')
const event = {};

event.addEvent = async (
    name,
    detail_event,
    time_begin,
    time_end,
    steps_finish,
    point) => {
    const values = [
        name,
        detail_event,
        time_begin,
        time_end,
        steps_finish,
        point
    ]
    const results = await procedure.sproc("add_event", values)
    return results[0];
}
event.uploadImage = async (
    event_id,
    image) => {
    const values = [
        event_id,
        image
    ]
    const results = await procedure.sproc("upload_image", values);
    return results[0];
}
event.allEvent = async (
    limit,
    offset) => {
    const values = [
        limit,
        offset
    ]
    const results = await procedure.sproc("all_event", values);
    return results[0];
}
event.joinEvent = async (
    user_id,
    event_id) => {
    const values = [user_id, event_id]
    const results = await procedure.sproc("join_event", values)
    return results;
}
event.eventById = async (
    event_id) => {
    const results = await procedure.sproc('get_event', [event_id])
    if (results[0].length > 0) {
        return results[0];
    }
}
event.eventJoined = async (user_id) => {
    const results = await procedure.sproc("get_event_joined", [user_id])
    return results[0];
}

module.exports = event;