const { successResponse, pagination } = require('../../helpers/response_handle/response_handle');
const rankModel = require('./rannk.model');
module.exports.getRank = async (req, res, next) => {
    let { type, page, limit } = req.query;
    if(page < 1) page = 1; 
    const offset = (page - 1) * limit;
    try {
        const results = await rankModel.getRank(type, parseInt(limit), offset)
        res.json(
            new pagination(
                results,
                page,
                limit
            )
        )
    } catch (err) {
        next(err)
    }
}
module.exports.getRankByEvent = async (req, res, next) => {
    const { event_id } = req.params;
    let { page, limit } = req.query;
    if(page < 1) page = 1; 
    const offset = (page - 1) * limit;
    try {
        const results = await rankModel.getRankByEvent(event_id, limit, offset)
        res.json(new successResponse(results))
    } catch (err) {
        next(err)
    }
}