class ErrorHandler extends Error {
  
    constructor(code, message) {
        super();
      this.status = "error";
      this.code = code
      this.message = message;
    }
  }
  class ErrorCodeHandler{
    constructor( message) {
    this.status = "error";
    this.message = message;
  }
  }
  const handleError = (err, res) => {
    let object = {
      status:"error",
      code:err.code,
      message:err.sqlMessage,
    }
    res.send(object)
  };

  module.exports = {
    ErrorHandler,
    ErrorCodeHandler,
    handleError
  }