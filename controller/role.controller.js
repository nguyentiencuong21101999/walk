
module.exports.admin = (req, res, next) => {
    console.log(req.data);

    const data = req.data;
    if (data) {
        try {
            res.json({
                token: data.token
                , refreshToken: data.refreshToken
            })
        }catch{ err => res.json({err})}
    }
}
module.exports.member = (req, res, next) => {
    const data = req.data;
    if (data) {
        try {
            res.json({
                token: data.token
                , refreshToken: data.refreshToken
            })
        }catch{ err => res.json({err})}
    }
}
module.exports.moderator = (req, res, next) => {
    const data = req.data;
    if (data) {
        try {
            res.json({
                token: data.token
                , refreshToken: data.refreshToken
            })
        }catch{ err => res.json({err})}
    }
}