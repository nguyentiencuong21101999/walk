var jwt = require('jsonwebtoken');
const generator = require('../helpers/jwt.helper')

verifyToken = (req, res, next) => {
    if (!req.headers.cookie) {
        // console.log(token[1]);
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    else{
        let token = req.headers.cookie.split("auth=")
        const decode = jwt.verify(token[1],process.env.TOKEN_SECRET)   
        req.data = (decode)
        next()
    }
}

isAdmin=(req,res,next) =>{
   
    console.log(req.body);
    const {token} = req.body;
    const decoded = generator.decodedToken(token,process.env.TOKEN_SECRET)
    console.log(decoded);
 
    if(decoded.strToken.role === 2 ){
        next()
    }else{
        return res.status(403).send({
            message: "Require Admin Role!"
          });
    }
}
isModerator = (req,res,next) =>{
    console.log(req.body);
    const {token} = req.body;
    const decoded = generator.decodedToken(token,process.env.TOKEN_SECRET)
    console.log(decoded);
 
    if(decoded.strToken.role === 3 ){
        next()
    }else{
        return res.status(403).send({
            message: "Require Moderator Role!"
          });
    }
}


const authJwt = {
    verifyToken: verifyToken,
    isAdmin:isAdmin,
    isModerator:isModerator
}
module.exports = authJwt;