class ErrorHandler extends Error {
    
    constructor(code, message) {
        super();
      this.status = "error";
      this.code = code
      this.message = message;
    }
  }
  const handleError = (err, res) => {
    let object = {
      status:"error",
      code:err.code,
      message:err.message
    }
    res.send(object )
  };

  module.exports = {
    ErrorHandler,
    handleError
  }