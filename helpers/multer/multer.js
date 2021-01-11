//-----MULTER------

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (_req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload_single = (file_name, req, res, next) => {
    new Promise((resolve, reject) => {
        var upload = multer({
            storage: storage,
            fileFilter: function (req, file, cb) {
                if (file.mimetype == "image/bmp" ||
                    file.mimetype == "image/png" ||
                    file.mimetype == "image/gif" ||
                    file.mimetype == "image/jpg" ||
                    file.mimetype == "image/jpeg"
                ) {
                    cb(null, true)

                } else {
                    req.error = 'Only image are allowed!'
                    cb()
                }
            }
        }).single(file_name)

        upload(req, res, (err) => {
            console.log(req.file);
            if (err){
                reject("loi")
            }
           resolve(req.filename)
        })
    })

}

module.exports = {
    upload_single
}