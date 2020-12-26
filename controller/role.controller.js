
module.exports.admin = (req, res, next) => {
    const info = req.data.info.strToken
    const token = req.data.token
    res.json({
        page: "admin",
        token:token ,
        info: info
    })
}
module.exports.member = (req, res, next) => {
    console.log(req.data);
    res.send("This is member ..." )
}
module.exports.moderator = (req, res, next) => {
    const data = req.data;
    res.send("This is moderator ...")
}