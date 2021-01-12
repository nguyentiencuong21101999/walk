//-----MULTER------
const fileFilter_image = require('../multer/fileFilter')
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
    return new Promise((resolve, reject) => {
        var upload = multer({
            storage: storage,
            fileFilter: fileFilter_image
        }).single(file_name)

        upload(req, res, (err) => {
            if (err){
                reject(err)
            }
           resolve(req.file) 
        })
    })

}

const upload_multiple  = (file_name,limit,req,res,next) =>{
    return new Promise((resolve, reject) => {
        var upload = multer({
            storage: storage,
            fileFilter: fileFilter_image
        }).array(file_name,limit)

        upload(req, res, (err) => {
            if (err){
                reject(err)
            }
           resolve(req.files)
        })
    })
}

module.exports = {
    upload_single,
    upload_multiple
}