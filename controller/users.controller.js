let query = require('../query');
let method = require('../DAO');
let success = require('../helpers/success')
var jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helpers/error')
const { successHandle, handleData, handleSuccess } = require('../helpers/success');
const e = require('express');

module.exports.users = async (req, res, next) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let sumPage = 0;
    if (page < 1) page = 1;
    let start = (page - 1) * limit

    await query(method.SELECT_ALL_USER, (err, data) => {
        if (err) {
            next(err)
        } else {
            sumPage = Math.ceil(data.length / limit);
            console.log(sumPage);

        }
    })

    await query(
        method.PAGE(start, limit), (err, result) => {
            if (err) {
                next(err)
            } else {
                let data = [];
                result.map((value, key) => {
                    data.push(new success.successHandle(value.username, value.password))
                })
                handleData(data, sumPage, res)
            }
        })
}
module.exports.add = (req, res) => {
    let user = {
        id: 1,
        username: "tiencuong0",
        password: "cuong",
        time: new Date()
    }
    let values = [[user.id, user.username, user.password, user.time]];
    query(method.INSERT, [values], (err, data) => {
        if (err) {
            let errors = new ErrorHandler(err.code, err.sqlMessage)
            res.json(errors)
        } else {
            handleSuccess(data, res)
        }

    })
}

module.exports.delete = (req, res) => {
    let id = 9;
    query(method.DELETE, id, (err, data) => {
        if (err) {
            let errors = new ErrorHandler(err.code, err.sqlMessage)
            res.json(errors)
        } else {
            handleSuccess(data, res)
        }
    })
}

module.exports.update = (req, res) => {

    let user = {
        id: 2,
        username: "tien123",
        password: "cuong1123",
        time: new Date()
    }
    let values = [user.username, user.password, user.time, user.id]
    query(method.UPDATE, values, (err, data) => {
        if (err) {
            let errors = new ErrorHandler(err.code, err.sqlMessage)
            res.json(errors)
        }else{
            handleSuccess(data, res)
        }
       
    })
}