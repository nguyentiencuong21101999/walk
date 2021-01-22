const {  successResponse } = require('../../helpers/response_handle/response_handle');
const activity = require('./activity.model');
const activityModel = require('./activity.model')

module.exports.addActivity = (req, res, next) => {
    const user_id = req.user.id;
    const { steps_number, time_begin, time_end } = req.body;
    activityModel.addActivity(steps_number, time_begin, time_end, user_id)
        .then(results =>{
            const activity = results[0];
            res.json(new successResponse(activity))
        })
        .catch(err =>
            next(err)
        )



}