
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cookieParser())
app.use(express.static("public"));
//Body parser
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
require('./helpers/redis/init_redis')
const { ErrorHandler, handleError } = require('./helpers/handleResponse/errorHandle')
const usersRouter = require('./routers/users.router');
const loginRouter = require('./routers/login.router')
const roleRouter = require('./routers/role.router');

// const generator = require('./helpers/jwt.helper')
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/role', roleRouter)

const client = require('./helpers/redis/init_redis');
const { refreshToken } = require('./controller/login.controller');
// client.rpush("accesstoken",{a:1})
app.use((err, req, res, next) => {
  handleError(err, res);
});

server.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});