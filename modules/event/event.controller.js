const { required } = require('joi');
const { successResponse } = require('../../helpers/response_handle/response_handle');
const { upload_single_formdata, upload_single } = require('../../multer/multer');
const eventModel = require('./event.model');

module.exports.add = (req, res, next) => {
    const { name, detail_event, time_begin, time_end, steps_finish, point } = req.body;
    eventModel.addEvent(name, detail_event, time_begin, time_end, steps_finish, point)
        .then(results => {
            const event_id = results[0];
            res.json(new successResponse(event_id[0])); // return event_id => uploadImageEvnet
        })
        .catch(err =>
            next(err)
        )
}
module.exports.uploadImageEvent = (req, res, next) => {
    const { id } = req.params;
    upload_single("fileImage", req, res, next)
        .then(image => {
            eventModel.uploadImageEvent(id, image.filename)
                .then(results => {
                    const event = results[0];
                    res.json(new successResponse(event[0]))
                })
                .catch(err => {
                    next(err)
                })
        })
        .catch(err => {
            next(err)
        })
}
module.exports.joinEvent = async (req, res, next) => {
    const user_id = req.user.id;
    const { event_id } = req.params;
    userModel.getEventById(event_id)  // kiem tra xem co event nay` k
        .then(results => {
            if (results[0].length > 0) {
                userModel.getUserEventByUserIdEventId(user_id, event_id) //kiem tra xem da join chuwa
                    .then(results => {
                        if (results[0].length == 0) {
                            userModel.joinEventUser(user_id, event_id)
                                .then(results => {
                                    res.json(new messageSuccessResponse(statusUser.joinEvent))
                                })
                                .catch(err => {
                                    next(err)
                                })
                        }
                        else {
                            next(new ErrorHandler(statusUser.errorJoinEvent))
                        }
                    })
                    .catch(err =>
                        next(err))
            }
            else {
                next(new ErrorHandler(statusUser.eventNotValid))
            }
        })
        .catch(err =>
            next(err))
}

module.exports.getAllEvent = (req, res, next) => {
    eventModel.getAllEvent()
        .then(results => {
            const all_event = results[0];
            res.json(new successResponse(all_event))
        })
        .catch(err => {
            next(err)
        })
}