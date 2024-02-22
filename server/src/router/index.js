const authRouter = require('./auth')
const productRouter = require('./product')
const userRouter = require('./user')
const discountRouter = require('./discount')
const cartRouter = require('./cart')
const checkoutRouter = require('./checkout')
const commentRouter = require('./comment')

const router = (app) => {

    app.use('/discount', discountRouter)

    app.use('/product', productRouter)

    app.use('/user', userRouter)

    app.use('/cart', cartRouter)
    
    app.use('/auth', authRouter)

    app.use('/checkout', checkoutRouter)

    app.use('/comment', commentRouter)
}

module.exports = router