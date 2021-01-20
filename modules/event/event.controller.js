const {upload_single_formdata} = require('../../multer/multer')
)

module.exports.add = (req,res,next) =>{
    console.log(req.body);
    upload_single_formdata("fileImage",req,res,next) 
    .then()
    .catch()

}