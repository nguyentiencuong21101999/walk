
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cookieParser = require('cookie-parser')
//ejs
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
//
require('dotenv').config()
app.use(cookieParser())
app.use(express.static("public"));
//PORT
const PORT = process.env.PORT;
var multer  = require('multer');
var upload = multer();
//Body parser
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

require('./database/connection/db.connection')

//mullter
const { handleError } = require('./helpers/error_handle/error_handle')
const userRouter = require("./modules/user/user.router")
const roleRouter = require("./modules/role/role.router");
app.use('/user', userRouter);
app.use('/role', roleRouter);


app.get('/upload',(req,res) =>{
  res.render("upload")
})

app.post('/upload',upload.none(),(req,res) =>{
  console.log( JSON.stringify(req.body));
})
app.use((err, req, res, next) => {
  handleError(err, res);
});
server.listen(PORT, function () {
  console.log(' App listening on port ' + PORT + "...");
});
