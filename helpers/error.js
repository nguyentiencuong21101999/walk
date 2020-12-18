class ErrorHandler extends Error {
    
    constructor(code, message) {
        super();
      this.status = "error";
      this.code = code
      this.message = message;
    }
  }
  const handleError = (err, res) => {
   console.log(err);
    let object = {
      status:"error",
      code:err.code,
      message:err.sqlMessage,
    }
    res.send(object)
  };

  module.exports = {
    ErrorHandler,
    handleError
  }