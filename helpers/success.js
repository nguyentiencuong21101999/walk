class successHandle{
    constructor(username,password) {
        this.username = username;
        this.password = password;    
    }  
}  

let handleData = (data,sumPage,res) =>{
    res.send({status:"success",sumPage,data})

}

let handleSuccess = (data,res) =>{
    res.send({status:"success",data})
}


module.exports ={successHandle,handleData,handleSuccess}