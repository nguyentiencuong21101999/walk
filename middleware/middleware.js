var jwt = require('jsonwebtoken');

let aut = (req,res,next) =>{
    if(req.headers.cookie){
        let cookies = req.headers.cookie.split("auth=")
        let decoded = jwt.verify(cookies[1],process.env.TOKEN_SECRET);
        req.data = decoded;
        next()
    }else{
        res.json({kq:0})
    }
}
module.exports = aut