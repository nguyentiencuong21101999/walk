const role ={}
const procedure = require('../../database/query/db.query')
role.getInfoById = (userId) =>{
    return  procedure.sproc("getInfoById",[userId])
}
module.exports = role;
