const express = require('express');
const router = express.Router();
const aut = require('../middleware/middleware')
const controller = require('../controller/users.controller')

router.get('/',aut,controller.users)
router.get('/add',controller.add)
router.get('/delete',controller.delete)
router.get('/update',controller.update)
router.get('/get_user',controller.get_user)


module.exports = router;