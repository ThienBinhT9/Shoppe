const router = require('express').Router()
const DiscountController = require('../controllers/discount.controller')
const { authorization } = require('../middlewares')


router.post('/', authorization, DiscountController.create)

router.post('/getDiscountValidOfShop', DiscountController.getDiscountOfShop)

router.post('/applyDiscount', authorization, DiscountController.applyDiscountToProduct)

router.get('/mydiscount', authorization, DiscountController.getMyDiscount)

router.delete('/:id', authorization, DiscountController.deleteMyDiscount)


module.exports = router
