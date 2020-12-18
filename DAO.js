module.exports ={
    SELECT_ALL_USER:"SELECT * FROM users",
    INSERT:"INSERT INTO users (id,username,password,time) VALUES ?",
    DELETE:"DELETE FROM users WHERE id = ?",
    UPDATE:"UPDATE users set  username =? , password =? , time = ?  WHERE id = ?",
    PAGE: (start,limit) => `SELECT * FROM users LIMIT ${start}, ${limit}`,
    LOGIN:" select * from users where username = ? and password = ? ",
}