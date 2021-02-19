const procedure = require('../../database/query/db.query');
const { ErrorHandler } = require('../../helpers/error_handle/error_handle');
const { statusActivity } = require("../../helpers/error_handle/status_code")
const activity = {};
// add activity
activity.addActivity = async (
    steps_number,
    time_begin,
    time_end,
    user_id
) => {
    const values = [
        steps_number,
        time_begin,
        time_end,
        user_id
    ]
    console.log(time_begin);
    const results = await procedure.sproc("add_activity", values);
    const activity_id  = results[1];
    if (results[0].length > 0) {
        results[0].map(async element => {
            console.log(element.time_join);
            // console.log(new Date(time_begin));
            // console.log(new Date(time_end)  < element.time_end);
            if( new Date(time_begin) > element.time_join  && new Date(time_begin) > element.time_begin && new Date(time_end) < element.time_end){
                await procedure.sproc("add_activity_event",[element.event_id,activity_id[0].activity_id])
            }
        })
    }

}
// get steps day by user_id
activity.getAcitivity = async(user_id,type) => {
     const results = await procedure.sproc("get_activity", [user_id,type]);
     console.log(results);
     if(results[0].length > 0){
         return results
     }
}

// get steps  event by user_id  and event id
activity.getActivityByEvent = async(user_id, event_id) => {
    const results = await procedure.sproc("get_activity_by_event", [user_id, event_id]);
    if(results[0].length > 0){
        return results[0]
    }
}
// check user joined 
activity.get_user_event_by_userId_eventId = (user_id, event_id) => {
    return procedure.sproc("get_user_event_by_userId_eventId", [user_id, event_id]);
}

module.exports = activity;