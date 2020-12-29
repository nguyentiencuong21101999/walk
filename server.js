
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cookieParser())
app.use(express.static("public"));
//PORT
const PORT = process.env.PORT;
//Body parser
var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

require('./database/connection/db.connection')

const {handleError} = require('./helpers/errorHandle/errorHandle')
const userRouter = require("./modules/user.router")
app.use('/user', userRouter)

app.use((err, req, res, next) => {
  handleError(err, res);
});

server.listen(PORT, function () {
  console.log(' App listening on port ' + PORT +"...");
});