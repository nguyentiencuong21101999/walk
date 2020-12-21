

module.exports.admin = (req,res,next) =>{
    console.log(req.data);
    res.send("admin")
}
module.exports.member =(req,res,next) =>{
    res.send("member")
}
module.exports.moderator = (req,res,next)=>{
    res.send("moderator")
}