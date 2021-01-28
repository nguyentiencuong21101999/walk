const { statusUser } = require("./status_code");

class ErrorHandler extends Error {
  constructor(error) {
    super();
    this.status = "error";
    this.code = error.code
    this.message = error.message;
  }
}
class ErrorCodeHandler {
  constructor(message) {
    this.status = "error";
    this.message = message;
  }
}
// const handleError = (err, res) => {
//   let object = {
//     status: "error",
//     code: err.code,
//     message: err.message,
//   }
//   res.send(object)
// };

const handleError = (reqErr, res) => {
  const err = parseSQLExceptionIfNeeded(reqErr)
  let { message } = err
  const { code, status } = err
  
  // // hide sensitive details error in production when thrown by Error
  // // if ((config.env.current === config.env.production
  // // && !(err instanceof ErrorHandler)) || !message) {
  // // message = ErrorCode.Sensitive.message
  // // }
  
  res
  // .status(status || ErrorCode.BadRequest.statusCode)
  .send({
  status: 'error',
  code,
  message
  })
  
 }

const parseSQLExceptionIfNeeded = (err) => {
  console.log('====================================');
  console.log(err);
  console.log('====================================');
  const { 
    code
    ,sqlMessage
  
  } = err
  if (code !== 'ER_SIGNAL_EXCEPTION') {
  return err
  }
  if (sqlMessage in statusUser) {
  return new ErrorHandler(statusUser[sqlMessage])
  }
  
  return new ErrorHandler(statusUser.isValidEmail)
}
module.exports = {
  ErrorHandler,
  ErrorCodeHandler,
  handleError
}