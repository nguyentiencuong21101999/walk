
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
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

require('./database/connection/db.connection')

//mullter
const { handleError } = require('./helpers/error_handle/error_handle')
const userRouter = require("./modules/user/user.router")
const eventRouter = require("./modules/event/event.router")
const activityRouter = require("./modules/activity/activity.router")
const rankRouter = require("./modules/rank/rank.router");
const roleRouter = require("./modules/role/role.router");
const { date } = require('joi');


app.use('/user', userRouter);
app.use('/event',eventRouter)
app.use('/activity',activityRouter);
app.use('/rank',rankRouter);
app.use('/role', roleRouter);

app.use((err, req, res, next) => {
  console.log(err);
  handleError(err, res);
});

server.listen(PORT, function () {
  console.log(' App listening on port ' + PORT + "...");
});
