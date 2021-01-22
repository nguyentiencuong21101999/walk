const procedure = require('../../database/query/db.query');

const activity ={};

activity.addActivity =(steps_number,time_begin,time_end,user_id) =>{
    return procedure.sproc("add_activity",[steps_number,time_begin,time_end,user_id]);
}

module.exports = activity;