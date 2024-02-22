const { cartModel } = require('../model/cart.model')
const { checkProductBySever } = require('../model/repo/product.repo')
const { GetDiscountAmount } = require('../model/repo/discount.repo')

class CheckoutController{
      
    async reviewCheckout(req, res) {
        /*
            data = {
                cartId,
                shop_order_ids:[
                    {
                        discount_id,
                        product_userId,
                        products:[
                            {
                                product_price,
                                product_id,
                                quantity
                            },
                            {
                                product_price,
                                product_id,
                                quantity
                            },
                        ]

                    },
                    {
                        discount_id,
                        product_userId,
                        products_order:[
                            {
                                product_price,
                                product_id,
                                quantity
                            }
                        ]

                    },
                ]
            }
        */
        try {
            const {cartId, shop_order_ids = []} = req.body
            const foundCart = await cartModel.findById(cartId).lean()
            if(!foundCart) return res.status(404).json('NotFound cart!')

            const checkout_order = {
                totalOrder:0,
                transport_fee:0,
                discount_amount:0,
                totalPrice:0
            }

            for (let index = 0; index < shop_order_ids.length; index++) {
                const {discount_id, products = []} = shop_order_ids[index]

                //check product bởi server
                const productsChecked = await checkProductBySever(products)
                if(!productsChecked[0]) return res.status(401).json('checkout wrong!!!')

                //tính tổng giá tiền hàng order đã được sever checked giá
                const totalOrder = productsChecked.reduce((acc, item) => {
                    return acc += (item.product_price * item.quantity)
                },0)
                checkout_order.totalOrder += totalOrder

                //Check xem người dùng có app mã giảm giá không?
                if(discount_id){
                    const discount_amount = await GetDiscountAmount(req.user_id, discount_id, totalOrder)
                    checkout_order.discount_amount += discount_amount
                    checkout_order.totalPrice += (totalOrder - discount_amount)
                }else{
                    checkout_order.totalPrice += totalOrder
                }
            }

            return res.status(200).json(checkout_order)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = new CheckoutController
