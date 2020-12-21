let query = require('../query');
let method = require('../DAO');
var jwt = require('jsonwebtoken');



module.exports.login = (req, res, next) => {
    let { username, password } = req.body;

    query(method.LOGIN, [username, password],
        (err, data) => {
            if (err) {
                next(err)
            } else {
                if (data.length <= 0) {
                    res.json({
                        accessToken: null,
                        message: "Invalid Username and Password"
                    })
                }
                else {
                    let strToken;
                    data.map((value, key) => {
                        strToken = value
                    })
                    const token = jwt.sign({ strToken }, process.env.TOKEN_SECRET,{ expiresIn:'1d' });
                    const refresh_token = jwt.sign({ strToken }, process.env.REFRESH_TOKEN_SECRET,{ expiresIn:'1d' });
                    res.cookie("auth", token)
                    res.cookie("refresh",refresh_token)
                    res.json({ accessToken: token,refresh_token:refresh_token, info: strToken })
                }

            }
        })

}
module.exports.refreshToken = (req,res,next) =>{
    console.log(req.headers);
    let refreshToken = req.headers.cookie.split(";")[1].split("refresh=")[1];
    console.log(refreshToken);
    if(refreshToken){
        res.clearCookie('auth')
        console.log(req.headers);
        // const token = jwt.sign({ strToken }, process.env.TOKEN_SECRET,{ expiresIn:'5s' });
    }

    

}

