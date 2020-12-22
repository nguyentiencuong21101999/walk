const ErrorRequest = [
    Oke = {
        code: 200,
        status: "oke"
    },
    BadRequest = {
        code: 400,
        status: "Bad Request"
    },
    Unauthorized = {
        code: 401,
        status: "Unauthorized"
    },
    Payment = {
        code: 401,
        status: "Payment Required"
    },
    Forbidden = {
        code: 403,
        status: "Forbidden "
    },
    NotFound = {
        code: 404,
        status: "Not Found "
    }
]
const ErrSQL = [
    ER_EMPTY_QUERY={
        status: "error",
        code: "ER_EMPTY_QUERY",
        message: "Query was empty"
    }
]