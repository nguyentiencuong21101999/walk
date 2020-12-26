
let conn  = require('./db')
conn.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected MySql");
    }
  
});
module.exports = function getData(strQuery,values,callback){
    return conn.query(strQuery,values,callback)
  }