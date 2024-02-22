const router = require('express').Router()
const CartController = require('../controllers/cart.controller')
const { authorization } = require('../middlewares')


router.post('/addProduct', authorization, CartController.addToCart)

router.get('/', authorization, CartController.getCart)

router.delete('/:product_id', authorization, CartController.deleteProductOfCart)

router.patch('/quantityProduct', authorization, CartController.updateQuantityProduct)


module.exports = router