
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle')

isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role === 2) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Admin Role!'))
    }
}
isModerator = (req, res, next) => {
    const user = req.user;
    if (user.role === 3) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require moderator Role!'))
    }
}


const authJwt = {
    isAdmin: isAdmin,
    isModerator: isModerator
}
module.exports = authJwt;