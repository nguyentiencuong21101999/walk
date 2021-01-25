const { successResponse } = require('../../helpers/response_handle/response_handle');
const rankModel = require('./rannk.model');

module.exports.getRankByDay = (req, res, next) => {
    rankModel.getRankByDay()
        .then(results => {
            const rank = results[0]
            res.json(new successResponse(rank));
        })
        .catch(err =>
            next(err)
        )

}
module.exports.getRankByMonth = (req, res, next) => {
    rankModel.getRankByMonth()
        .then(results => {
            const rank = results[0]
            res.json(new successResponse(rank));
        })
        .catch(err =>
            next(err)
        )

}
module.exports.getRankByEvent = (req, res, next) => {
    const event_id = req.params.event_id;
    rankModel.getRankByEvent(event_id)
        .then(results => {
            const rank = results[0]
            res.json(new successResponse(rank));
        })
        .catch(err =>
            next(err)
        )
}