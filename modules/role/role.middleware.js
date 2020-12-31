const { ErrorHandler, handleError } = require('../../helpers/error_handle/error_handle');

isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === 2) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Admin Role!'))
    }
}
isClient = (req, res, next) => {
    const user = req.user;
    if (user.role === 1) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Client Role!'))
    }
}


const authRole = {
    isAdmin: isAdmin,
    isClient: isClient
}
module.exports = authRole;