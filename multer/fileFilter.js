const { ErrorHandler } = require("../helpers/error_handle/error_handle");
const { statusMulter } = require("../helpers/error_handle/status_error");

const fileFIlter_image = function (req, file, cb) {
    if (file.mimetype == "image/bmp" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(new ErrorHandler(statusMulter.isOnlyIamge))
    }
}

module.exports = fileFIlter_image;