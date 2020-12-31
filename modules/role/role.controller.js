const model = require('./role.model')
const querySql = require('../../database/query/db.query')
const {successResponse} = require('../../helpers/response_handle/response_handle');
module.exports.isClient = (req,res,next) =>{
    const userId = req.user.id;
    querySql(model.getInfoById(userId),(err,data) =>{
        if(err) {
            next(err)
        }
        res.json(new successResponse(data[0]))
    })
     
}

module.exports.isAdmin = (req,res,next) =>{
    const userId = req.user.id;
    querySql(model.getInfoById(userId),(err,data) =>{
        if(err) {
            next(err)
        }
        res.json(new successResponse(data[0]))
    })
     
}