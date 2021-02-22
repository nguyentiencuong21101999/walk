const { required } = require('joi');
const { statusEvent } = require('../../helpers/error_handle/status_code');
const { successResponse, messageSuccessResponse, pagination } = require('../../helpers/response_handle/response_handle');
const { upload_single } = require('../../multer/multer');
const eventModel = require('./event.model');

module.exports.add = async (req, res, next) => {
    const { name, detail_event, time_begin, time_end, steps_finish, point } = req.body;
    const results = await eventModel.addEvent(name, detail_event, time_begin, time_end, steps_finish, point)
    res.json(new successResponse(results[0]))
}
module.exports.uploadImage = async (req, res, next) => {
    const { event_id } = req.params;
    try {
        const image = await upload_single("fileImage", req, res, next)
        const filename = image.filename;
        const results = await eventModel.uploadImage(event_id, filename);
        res.json(new successResponse(results[0]))
    } catch (err) {
        next(err)
    }
}
module.exports.joinEvent = async (req, res, next) => {
    const user_id = req.user.id;
    const { event_id } = req.params;
    try {
        const results = await eventModel.joinEvent(user_id, event_id)
        if (results) {
            res.json(new messageSuccessResponse(statusEvent.Joined))
        }
    } catch (err) {
        next(err)
    }
}
module.exports.EventById = async (req, res, next) => {
    const { event_id } = req.params;
    try {
        const results = await eventModel.eventById(event_id)
        res.json(new successResponse(results[0]))
    } catch (err) {
        next(err)
    }
}
module.exports.allEvent = async (req, res, next) => {
    let { page, limit } = req.query;
    if(page <  1)  page = 1;
    const offset = (page - 1) * limit;
    try {
        const results = await eventModel.allEvent(limit,offset);
        res.json(new pagination(results,page,limit))
    } catch (err) {
        next(err)
    }
}
module.exports.eventJoined = async (req, res, next) => {
    const user_id = req.user.id;
    try {
        const results = await eventModel.eventJoined(user_id);
        res.json(new successResponse(results))
    } catch (err) {
        next(err)
    }
}