const fileFIlter_image = function (req, file, cb) {
    if (file.mimetype == "image/bmp" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb('Only image are allowed!')
    }
}

module.exports = fileFIlter_image;