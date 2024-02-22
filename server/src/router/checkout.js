const router = require('express').Router()
const { authorization } = require('../middlewares')
const CheckoutController = require('../controllers/checkout.controller')

router.post('/review', authorization, CheckoutController.reviewCheckout)

module.exports = router