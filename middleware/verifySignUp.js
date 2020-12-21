let query = require('../query');

checkDuplicate  = (req,res,next) =>{
    let {username,password,role} = req.body
    query(`CALL checkUsername('${username}')`, (err,data) =>{
        if(err){
            next(err)
        }
        if(data[0].length > 0){
            res.send({message:"tai khoan da co nguoi su dung"});
            return;
        }
        next()
    })

}

// checkRoleExited = (req,res,next) =>{
//     let {role} = req.body;
//     if(!role){
//         res.json({
//             message:"Role khong ton tai"
//         })
//         return;
//     }
//     next()
// }

const verifySignUp ={
    checkDuplicate:checkDuplicate,
    // checkRoleExited:checkRoleExited
}
module.exports = verifySignUp;