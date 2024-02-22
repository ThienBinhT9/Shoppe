const router = require('express').Router()
const UserController = require('../controllers/user.controller')
const { authorization } = require('../middlewares')
const uploadCloud = require('../configs/cloudinary.config')

router.patch('/confirmSales', authorization, UserController.confirmSales)

router.patch('/update', authorization, uploadCloud.single('avatar'), UserController.update)

router.get('/shops', UserController.getShop)

module.exports = router
