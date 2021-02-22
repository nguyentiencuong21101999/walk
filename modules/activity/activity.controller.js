const { ErrorHandler } = require('../../helpers/error_handle/error_handle');
const { successResponse, messageSuccessResponse } = require('../../helpers/response_handle/response_handle');
const activityModel = require('./activity.model')
const { statusActivity } = require('../../helpers/error_handle/status_code');

module.exports.addActivity = async (req, res, next) => {
    const user_id = req.user.id;
    const { steps_number, time_begin, time_end } = req.body;
    try {
        await activityModel.addActivity(
            steps_number,
            time_begin,
            time_end,
            user_id
        );
        res.json(
            new messageSuccessResponse(
                statusActivity.AddActivitySuccess
            )
        )
    } catch (err) {
        next(err)
    }

}

module.exports.getActivity = async (req, res, next) => {
    const user_id = req.user.id;
    const { type } = req.query
    try {
        const results = await activityModel.getAcitivity(user_id, type)
        if (results) {
            const temp = [];
            for (let i = 0; i < results.length - 1; i++) {
                const element = results[i];
                temp.push(element[0])
            }
            res.json(new successResponse(temp))
        } else {
            res.json(new ErrorHandler(statusActivity.ErrorGetActivity))
        }
    } catch (err) {
        next(err)
    }



}

module.exports.getActivityByEvent = async (req, res, next) => {
    const user_id = req.user.id;
    const event_id = req.params.event_id;
    try {
        const results = await activityModel.getActivityByEvent(user_id, event_id)

        if (!results) res.json(new ErrorHandler(statusActivity.ErrorGetJoined))
        else res.json(new successResponse(results))
    } catch (err) {
        next(err)
    }
}