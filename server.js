
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

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

require('./database/connection/db.connection')
//Queue
const {setQueue,BullAdapter,
  createQueue,
  processQueue
} = require('./helpers/queue/queue')

const { handleError } = require('./helpers/error_handle/error_handle')

const userRouter = require("./modules/user/user.router")
const eventRouter = require("./modules/event/event.router")
const activityRouter = require("./modules/activity/activity.router")
const rankRouter = require("./modules/rank/rank.router");
const roleRouter = require("./modules/role/role.router");
const { router } = require('bull-board');


app.use('/user', userRouter);
app.use('/event', eventRouter)
app.use('/activity', activityRouter);
app.use('/rank', rankRouter);
app.use('/role', roleRouter);

app.use((err, req, res, next) => {
  console.log(err);
  handleError(err, res);
});
setQueue("add_activity_event");
app.use('/admin/queues', router)
console.log(process.env.DELAY);
server.listen(PORT, function () {
  console.log(' App listening on port ' + PORT + "....");
});

