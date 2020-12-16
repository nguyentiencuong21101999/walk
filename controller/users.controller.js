let query = require('../query');
let method = require('../DAO');

module.exports.users = (req,res) =>{
    console.log(req.body);
    query(
        method.SELECT_ALL_USER
        ,(err,data) =>{
        if(err){
            res.send(err)
        }
        res.send(data)
    })

}
module.exports.add = (req,res) =>{
    let user = {
         id:9,
         username:"tiencuong0",
         password:"cuong",
         time:new Date()
    }
    let values = [[user.id,user.username,user.password,user.time]];
    query(method.INSERT,[values],(err,data)=>{
        if(err){
            res.send(err)
        }
        res.send({msg:'Thanh Cong'});
    })
}

module.exports.delete = (req,res) =>{
    let id = 9;
    query(method.DELETE,id,(err,data) =>{
        console.log(data);
        res.send({msg:"Thanh Cong"});
    })
}

module.exports.update = (req,res) =>{

    let user = {
        id:5,
        username:"tien",
        password:"cuong1",
        time: new Date()
   }
    let values = [user.username,user.password,user.time,user.id]
    query(method.UPDATE,values,(err,data) =>{
        if(err){
        console.log(err);
        }
        res.send({msg:'Thanh Cong'})
    })
}