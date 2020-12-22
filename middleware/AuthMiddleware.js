var jwt = require('jsonwebtoken');
const generator = require("../helpers/jwt.helper")
const client = require('../helpers/init_redis');
// bao ve api can bao mat
let isAuth = async(req,res,next) =>{
    
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(tokenFromClient);
    if (tokenFromClient) {
         // Nếu tồn tại token
        try {
          // Thực hiện giải mã token xem có hợp lệ hay không?
          const decoded = await jwt.verify(tokenFromClient,process.env.TOKEN_SECRET);
          // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.

          const freshToken = generator.generatorToken(decoded.strToken, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE)

          const data = {
            token:tokenFromClient,
            refreshToken:freshToken
          }

          client.set('refreshToken', freshToken)
          
          req.data= data;
            // Cho phép req đi tiếp sang controller.
          next();
        } catch (error) {
          // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
          // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
          return res.status(401).json({
            message: 'Unauthorized.',
          });
        }
      } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
          message: 'No token provided.',
        });
      }
    }
    module.exports = {
        isAuth: isAuth,
      };