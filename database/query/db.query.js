

const connection = require('../connection/db.connection')
const querySql = (strQuery, callback) => {
    return connection.query(strQuery, callback);
}
/** Execute raw query */
const query = async ( params) => {
    
    // console.log(params);
    // // try {
    // //     const { results } = await pool.query(sql, escapeParams(params))
    // //     return results
    // // } catch (err) {
    // //     throw err
    // // }
    // //let a = params;
    // let a = connection.escape(params);
    // const URL = `select * from user where id = ` + a ;
    // connection.query(URL,(err,data) =>{
    //     console.log(data);
    // })
}
const queryProc = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results);
        })
    })
}


const sproc = async (procName, params) => {
        const query = `CALL ${procName}(${escapeParams(params)})`
        const results = await queryProc(query)
        return results;
}

/** Escape an untrusted string to be used as a SQL value. */
const escapeParams = (params) => {
    let escapedParams = []
    for (let param of params) {
        //mysql === connection
        escapedParams.push(connection.escape(param))
    }
    return escapedParams.join(',');
}

module.exports = {
    querySql,
    sproc,
    query
};