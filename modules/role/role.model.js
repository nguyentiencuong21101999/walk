const role ={}

role.getInfoById = (userId) =>{
    return `CALL getInfoById('${userId}')` 
}

module.exports = role;
