
var express = require('express');
var app = express();
const server = require('http').Server(app);
require('dotenv').config()
app.use(express.static("public"));
//Body parser
var bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));
app.use(express.json())


let usersRouter = require('./routers/users.router');

app.use('/users',usersRouter)


server.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});