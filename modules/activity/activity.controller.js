const { ErrorHandler } = require('../../helpers/error_handle/error_handle');
const { successResponse } = require('../../helpers/response_handle/response_handle');
const activity = require('./activity.model');
const activityModel = require('./activity.model')
const { statusActivity } = require('../../helpers/error_handle/status_code');

module.exports.addActivity = (req, res, next) => {
    const user_id = req.user.id;
    const { steps_number, time_begin, time_end } = req.body;

    activityModel.addActivity(steps_number, time_begin, time_end, user_id)
        .then(results => {
            const activity = results[0];
            const activity_id = activity[0].activity_id;
            activityModel.getAllEventJoined(user_id) //if joined = true 
                .then(results => {
                    if (results.length > 0) {
                        results[0].map(element => {
                            const time_begins = new Date(time_begin).getTime();
                            const time_ends = new Date(time_end).getTime();
                            const element_time_begin = new Date(element.time_begin).getTime();
                            const element_time_end = new Date(element.time_end).getTime();
                            const time_join = new Date(element.time_join).getTime();
                            if (time_begins > time_join && time_begins > element_time_begin && time_ends < element_time_end) {
                                console.log(element.event_id);
                                console.log(activity_id);
                                activityModel.addActivityEvent(element.event_id, activity_id)
                                    .then(results => {
                                        console.log(results);
                                    })
                                    .catch(err =>
                                        next(err)
                                    )
                            }
                        })
                    }
                })
                .catch(err =>
                    next(err)
                )
            const activitys = results[1];
            res.json(new successResponse(activitys))
        })
        .catch(err =>
            next(err)
        )

}

module.exports.getActivityByDay = (req, res, next) => {
    const user_id = req.user.id;
    activityModel.getAcitivityByDay(user_id)
        .then(results => {
            const temp = [];
            for (let i = 0; i < results.length - 1; i++) {
                const element = results[i];
                temp.push(element[0])
            }
            res.json(new successResponse(temp))
        })
        .catch(err =>
            next(err)
        )

}

module.exports.getActivityByWeek = (req, res, next) => {
    const user_id = req.user.id;
    activityModel.getActivityByWeek(user_id)
        .then(results => {
            const temp = [];
            for (let i = 0; i < results.length - 1; i++) {
                const element = results[i];
                temp.push(element[0])
            }
            res.json(new successResponse(temp))
        })
        .catch(err =>
            next(err)
        )
}

module.exports.getActivityByMonth = (req, res, next) => {
    const user_id = req.user.id;
    activityModel.getAcitivityByMonth(user_id)
        .then(results => {
            const temp = [];
            for (let i = 0; i < results.length - 1; i++) {
                const element = results[i];
                temp.push(element[0])
            }
            res.json(new successResponse(temp))
        })
        .catch(err =>
            next(err)
        )

}

module.exports.getActivityByEvent = (req, res, next) => {
    const user_id = req.user.id;
    const event_id = req.params.event_id;
    console.log(user_id);
    console.log(event_id);
    activityModel.getActivityByEvent(user_id, event_id)
        .then(results => {
            const steps = results[0];
            console.log(steps);
            if (steps.length > 0) {
                res.json(new successResponse(steps))
            }
            else {
                activityModel.get_user_event_by_userId_eventId(user_id, event_id)
                    .then(results => {
                        console.log(results[0]);
                        if (results[0].length > 0) {
                            res.json(new successResponse({ tatol_steps: 0 }));
                        }
                        else {
                            res.json(new ErrorHandler(statusActivity.errorJoin))
                        }
                    })
                    .catch(err => {
                        next(err)
                    }
                    )
            }


        })
        .catch(err =>
            next(err)
        )

}