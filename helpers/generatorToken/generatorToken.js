const jwt =require('jsonwebtoken')

generatorToken = (strToken,secret,expiresIn) =>{
    return token = jwt.sign({ strToken }, secret,{ expiresIn:expiresIn});
}
decodedToken = (token,secret) =>{
    return decoded = jwt.verify(token,secret);
}
const generator = {
    generatorToken:generatorToken,
    decodedToken:decodedToken
}
module.exports = generator;