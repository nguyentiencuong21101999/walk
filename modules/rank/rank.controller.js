const { successResponse } = require('../../helpers/response_handle/response_handle');
const rankModel = require('./rannk.model');
module.exports.getRank = async (req, res, next) => {
    const { type, page, limit } = req.query;
    const offset = (page - 1) * limit;
    try {
        const results = await rankModel.getRank(type, parseInt(limit), offset)
        res.json(new successResponse(results))
    } catch (err) {
        next(err)
    }
}
module.exports.getRankByEvent = async(req, res, next) => {
    const { event_id } = req.params;
    const { page, limit } = req.query;
    const offset = (page-1) * limit;
    try {
        const results = await rankModel.getRankByEvent(event_id,limit,offset)
        res.json(new successResponse(results))
    } catch (err) {
        next(err)
    }
}