const model = require('./user.modle')
const bcrypt = require('../helpers/bcrypt/bcrypt')
const { successResponse } = require('../helpers/responseHandle/ResponseHandle');
const authJwt = require('./user.middleware')
const querySql = require('../database/query/db.query');

module.exports.getUserByEmail = (req, res, next) => {
    const { email } = req.body;
    querySql(model.getUserByEmail(email), (err, data) => {
        if (err) {
            console.log(err);
        }
        res.json(new successResponse(data[0]))
    })


}
module.exports.signin = (req, res, next) => {
    const { email, password } = req.body;
    querySql(model.getUserByEmail(email), async(err, data) => {
        if (err) {
            next(err)
        }
        let info = {};
        data[0].map((value, key) => {
            info = value
        })
        const user = {
            id:info.id,
            role:info.role
        }
        const compare = await bcrypt.comparePassword(password,info.password)
        if(compare === true){
           const generator = authJwt.generatorToken(user)
           //store refreshToken
           authJwt.storeRefreshToken(generator.refreshToken)
           res.json({
               accessToken : generator.token,
               refreshToken : generator.refreshToken
           })   
        }
    })


}

module.exports.signup = async (req, res, next) => {
    console.log(req.body);
    const { email, password, fistName, lastName,role } = req.body;
    const hash = await bcrypt.hashPassword(password);
    querySql(model.insertUser(email, hash, fistName, lastName,role), (err, data) => {
        if (err) {
            next(err)
        }
        res.json(new successResponse(data));
    })
}

module.exports.refreshToken =(req,res) =>{
    const generator = req.generator;
    const data = {
        newToken:generator.token,
        newRefreshToken:generator.refreshToken
    }
    console.log(data);
    res.send(data)
}
