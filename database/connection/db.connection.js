const mysql = require('mysql');
const DB_CONFIG = require('../configs/db.config')
let connection = mysql.createConnection(DB_CONFIG);
connection.connect((err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected MySql...");
    }
});
module.exports = connection;
