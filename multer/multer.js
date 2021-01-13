//-----MULTER------

const fileFilter_image = require('../multer/fileFilter')
var multer = require('multer');
const { ErrorHandler } = require('../helpers/error_handle/error_handle');
const { statusMulter } = require('../helpers/error_handle/status_error')

var storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
const upload_single = (file_name, req, res, next) => {
    return new Promise((resolve, reject) => {
        var upload = multer({
            storage: storage,
            fileFilter: fileFilter_image
        }).single(file_name)
        upload(req, res, (err) => {
            if (!req.file) {
                next(new ErrorHandler(statusMulter.chooseFile))
            }
            if (err) {
                next(err)
            } else {
                resolve(req.file)
            }

        })
    })

}

const upload_multiple = (file_name, limit, req, res, next) => {
    return new Promise((resolve, reject) => {
        var upload = multer({
            storage: storage,
            fileFilter: fileFilter_image
        }).array(file_name, limit)

        upload(req, res, (err) => {
            //err cua he thong hoac custom (fileFilter)
            if (err) {
                reject(err)
            } else {
                resolve(req.files)
            }

        })
    })
}

module.exports = {
    upload_single,
    upload_multiple
}