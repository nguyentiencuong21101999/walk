const procedure = require('../../database/query/db.query');

const activity ={};
// add activity
activity.addActivity =(steps_number,time_begin,time_end,user_id) =>{
    return procedure.sproc("add_activity",[steps_number,time_begin,time_end,user_id]);
}
// get steps day by user_id
activity.getAcitivityByDay = (user_id)=>{
    return procedure.sproc("get_steps_day_by_id",[user_id]);
}
// get steps week by user_id
activity.getActivityByWeek = (user_id) =>{
    return procedure.sproc('get_steps_week_by_id',[user_id]);
}
// get steps month by user_id
activity.getAcitivityByMonth = (user_id) =>{
    return procedure.sproc('get_steps_month_by_id',[user_id]);
}

// get Event => user joined ..
activity.getAllEventJoined =(user_id)=>{
    return procedure.sproc("get_all_event_joined",[user_id]);
 }
 // add activity to event (where)
 activity.addActivityEvent =(event_id,activity_id) =>{
     return procedure.sproc('add_activity_event',[event_id,activity_id]);
 }
// get steps  event by user_id  and event id
activity.getActivityByEvent =(user_id,event_id) =>{
    return procedure.sproc("get_steps_event_by_id",[user_id,event_id]);
}
// check user joined 
activity.get_user_event_by_userId_eventId = (user_id,event_id) =>{
    return procedure.sproc("get_user_event_by_userId_eventId",[user_id,event_id]);
}

module.exports = activity;