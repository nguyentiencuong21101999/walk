class ErrorHandler extends Error {
    constructor(error) {
        super();
      this.status = "error";
      this.code = error.code
      this.message = error.message;
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
      message:err.message,
    }
    res.send(object)
  };

  module.exports = {
    ErrorHandler,
    ErrorCodeHandler,
    handleError
  }