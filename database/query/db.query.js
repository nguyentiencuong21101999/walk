
const connection = require('../connection/db.connection')
const { ErrorCodeHandler } = require('../../helpers/error_handle/error_handle')
const querySql = (strQuery, callback) => {
    return connection.query(strQuery, callback);
}
/** Execute raw query */
const query = async (sql, params) => {
    try {
        const { results } = await pool.query(sql, escapeParams(params))
        return results
    } catch (err) {
        throw err
    }
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
    try {
        const query = `CALL ${procName}(${escapeParams(params)})`
        const results = await queryProc(query)
        return results;
    } catch (err) {
        return {
            err: err
        }
    }
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
    sproc
};