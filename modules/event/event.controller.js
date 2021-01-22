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
            console.log(image);
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