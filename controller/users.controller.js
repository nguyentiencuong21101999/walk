let query = require('../query');
let method = require('../DAO');
const { successResponse, pagination, handleSuccess } = require('../helpers/handleResponse/successHandle');

module.exports.get_user = (req,res) =>{
    query(
        // method.SELECT_ALL_USER
        `CALL get_users`
        , (err, data) => {
         if (err) {
             next(err)
         } else {
             console.log(data);
            res.json({data:data})
         }
     })
}

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
module.exports.add = (req, res,next) => {
    let user = {
        id: 4,
        username: "moderator",
        password: "moderator",
        role:3
    }
    query(
        //method.INSERT, [values]
        `CALL insert_users(${user.id},'${user.username}','${user.password}',${user.role} )`
        , (err, data) => {
        if (err) {
            next(err)
        } else {
            const successResponses = new successResponse(data);
            res.json(successResponses.handleSuccessRes())
        }

    })
}

module.exports.delete = (req, res) => {
    let id = 2;
    query(`CALL delete_users(${id})`, (err, data) => {
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
    query(`CALL update_users('${user.username}','${user.password}',${user.id})`, (err, data) => {
        if (err) {
           next(err)
        } else {
            const successResponses = new successResponse(data);
            res.json(successResponses.handleSuccessRes())
        }

    })
}