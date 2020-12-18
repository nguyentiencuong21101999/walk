let query = require('../query');
let method = require('../DAO');
var jwt = require('jsonwebtoken');


module.exports.login = (req,res,next)=>{
   let username = "tien";
   let password = "cuong1";
   
    query(method.LOGIN,[username,password],
    (err,data) =>{
        if(err){
            next(err)
        }else{
            let strToken;
            data.map((value,key) =>{
                strToken = value
            })
             const token = jwt.sign({ strToken },process.env.TOKEN_SECRET);
            res.cookie("auth",token).json({cookies:token})

        }
    })

}

