
const connection = require('../connection/db.connection')

const querySql = (strQuery,callback) =>{
    return connection.query(strQuery,callback);
}
module.exports = querySql;