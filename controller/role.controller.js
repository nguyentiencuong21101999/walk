
module.exports.admin = (req, res, next) => {
    console.log(req.data);
    res.send("This is admin ...")
}
module.exports.member = (req, res, next) => {
    const data = req.data;
    res.send("This is member ...")
}
module.exports.moderator = (req, res, next) => {
    const data = req.data;
    res.send("This is moderator ...")
}