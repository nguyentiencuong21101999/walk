const modelRole = require('./role.model')
const { successResponse } = require('../../helpers/response_handle/response_handle');
module.exports.isClient = async (req, res, next) => {
    const userId = req.user.id;
    const results = await modelRole.getInfoById(userId)
    if(results.err){
        next(results.err)
    }
    res.json(
        new successResponse(results[0])
    )
}

module.exports.isAdmin = async (req, res, next) => {
    const userId = req.user.id;
    const results = await modelRole.getInfoById(userId)
    res.json(
        new successResponse(results[0])
    )
}