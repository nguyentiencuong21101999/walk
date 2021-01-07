
var DB_CONFIG = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : null,
    database : process.env.DB_DATABASE,
  }
module.exports = DB_CONFIG;