const token_secrect = {
    jwt:{
        accessToken:{
            TOKEN_SECRET:process.env.TOKEN_SECRET,
            TOKEN_LIFE:process.env.TOKEN_LIFE
        },
        refreshToken:{
            REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
            REFRESH_TOKEN_LIFE:process.env.REFRESH_TOKEN_LIFE
        }
    }
}

module.exports = token_secrect

