
const generator = require('../helpers/generatorToken/generatorToken')
const { ErrorHandler, handleError } = require('../helpers/handleResponse/errorHandle')

isAdmin = (req, res, next) => {

    const { token } = req.body;
    const decoded = generator.decodedToken(token, process.env.TOKEN_SECRET)
    if (decoded.strToken.role === 2) {
        next()
    } else {
        res.send(new ErrorHandler(403, 'Require Admin Role!'))
    }
}
isModerator = (req, res, next) => {
    const { token } = req.body;
    const decoded = generator.decodedToken(token, process.env.TOKEN_SECRET)
    if (decoded.strToken.role === 3) {
        next()
    } else {
        res.send(new ErrorHandler(403, "Require Moderator Role!"))
    }
}


const authJwt = {
    isAdmin: isAdmin,
    isModerator: isModerator
}
module.exports = authJwt;