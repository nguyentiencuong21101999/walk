class successResponse {
    constructor(data, message) {
        this.status = "success"
        this.data = data;
        this.message = message;
    }

}
class messageSuccessResponse {
    constructor(success) {
        this.status = "success";
        this.code =success.code,
        this.message = success.message;
    }
}

class pagination extends successResponse {
    constructor(data, page, limit, message,) {
        super(data, message)
            this.page = page,
            this.limit = limit
            //this.total = total
    }
    successPagination = () => {
        let successPage = {
            page: this.page,
            limit: this.limit,
            //total: this.total,
        }
        return [
            this.handleSuccessRes()
            , successPage]
    }
}


let handleSuccess = (data, res) => {
    res.send({ status: "success", data })
}


module.exports = {
    successResponse,
    messageSuccessResponse,
    pagination,
    handleSuccess
}