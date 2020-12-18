let query = require('../query');
let method = require('../DAO');
const { successResponse, pagination, handleSuccess } = require('../helpers/success');

module.exports.users = async (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let sumPage = 0;
    if (page < 1) page = 1;
    let start = (page - 1) * limit

    await query(method.SELECT_ALL_USER, (err, data) => {
        if (err) {
            next(err)
        } else {
            sumPage = Math.ceil(data.length / limit);
        }
    })

    await query(
        method.
            PAGE(start, limit)
        // SELECT_ALL_USER
        , (err, data) => {
            if (err) {
                next(err)
            } else {
                console.log(req.data.strToken);
                // const successResponses = new successResponse(result)
                // successResponses.handleSuccessRes(res)
                const paginations = new pagination(data, page, limit, sumPage)
                res.json([paginations.successPagination(),req.data.strToken])
            }
        })
}
module.exports.add = (req, res) => {
    let user = {
        id: 2,
        username: "tiencuong0",
        password: "cuong",
        time: new Date()
    }
    let values = [[user.id, user.username, user.password, user.time]];
    query(method.INSERT, [values], (err, data) => {
        if (err) {
            next(err)
        } else {
            const successResponses = new successResponse(data);
            res.json(successResponses.handleSuccessRes())
        }

    })
}

module.exports.delete = (req, res) => {
    let id = 9;
    query(method.DELETE, id, (err, data) => {
        if (err) {
            next(err)
        } else {
            const successResponses = new successResponse(data);
            res.json(successResponses.handleSuccessRes())
        }
    })
}

module.exports.update = (req, res) => {

    let user = {
        id: 1,
        username: "tien123",
        password: "cuong1123",
        time: new Date()
    }
    let values = [user.username, user.password, user.time, user.id]
    query(method.UPDATE, values, (err, data) => {
        if (err) {
           next(err)
        } else {
            const successResponses = new successResponse(data);
            res.json(successResponses.handleSuccessRes())
        }

    })
}