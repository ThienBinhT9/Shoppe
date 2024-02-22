const { cartModel, productCartModel } = require('../model/cart.model')
const { findProductById } =  require('../model/repo/product.repo')

class CartController{

    static async CreateCartUser(user_id, product){
        try {
            const options = {upsert:true, new:true}
            const query = {cart_userId: user_id}

            const productCart = await productCartModel.findOneAndUpdate({cart_userId:user_id, product_userId:product.product_userId},{
                $addToSet:{
                    products:product
                }
            },options).lean()

            const cart = await cartModel.findOneAndUpdate(query,{
                $addToSet:{
                    cart_products:productCart._id
                },
                $inc:{
                    cart_count_product:1
                }
            },options).lean()

            return cart
        } catch (error) {
            return error.message
        }
    }

    static async UpdateQuantityProductV1(user_id, product){
        try {
            const query = {cart_userId:user_id, products:{ $elemMatch:{ product_id: product.product_id } }}
            const options = {upsert:true, new:true}

            const cartProduct = await productCartModel.findOneAndUpdate(query,{
                $inc:{
                    'products.$.quantity': product.quantity
                }
            }, options).lean()

            return cartProduct
        } catch (error) {
            return error.message
        }
    }
    
    async addToCart(req, res) {
        try {
            const { product_id } = req.body

            const foundCart = await cartModel.findOne({cart_userId:req.user_id}).lean()
            const foundProductCart = await productCartModel.findOne({cart_userId:req.user_id, products:{ $elemMatch:{ product_id } }}).lean()

            if(foundCart && foundProductCart){
                await CartController.UpdateQuantityProductV1(req.user_id, req.body)

                return res.status(200).json('handle change quantity successfully')
            }

            await CartController.CreateCartUser(req.user_id, req.body)

            return res.status(200).json({
                message:'Thêm sản phẩm vào giỏ hàng thành công!',
                product:req.body
            })

        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

    async getCart(req, res) {
        try {
            const query = { cart_userId:req.user_id }
            const options = { upsert:true, new:true }
            const cart = await cartModel.findOneAndUpdate(query,{}, options).lean()
            if(!cart){
                return res.status(404).json('Not found Cart!.Please relogin')
            }

            const products_cart = await productCartModel.find({_id:{$in:cart.cart_products}}).lean().sort({createdAt:-1})

            return res.status(200).json({
                _id:cart._id,
                cart_count_product:cart.cart_count_product,
                products_cart
            })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async deleteProductOfCart(req, res) {
        try {
            const { product_id } = req.params
            const query = {
                cart_userId:req.user_id, 
                products:{ $elemMatch:{ product_id } }
            }
            const product = await productCartModel.findOneAndUpdate(query, {
                $pull:{ products:{ product_id } }
            }, {new:true}).lean()

            if(product){
                await cartModel.updateOne({cart_userId:req.user_id}, {
                    $inc:{
                        cart_count_product: -1
                    }
                }, {new:true})
            }

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async updateQuantityProduct(req, res) {
        try {
            const { quantity, old_quantity, product_id, shop_id } = req.body
            const foundProduct = await findProductById(product_id)
            if(!foundProduct) return res.status(404).json('NotFound')

            if(foundProduct.product_userId !== shop_id){
                return res.status(401).json('Bạn không có quyền!')
            }

            const cart = await CartController.UpdateQuantityProductV1(req.user_id, {
                quantity: quantity - old_quantity,
                product_id
            })
            if(cart){
                return res.status(200).json(req.body)
            }

            return res.status(401).json('Update Failed')

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new CartController
