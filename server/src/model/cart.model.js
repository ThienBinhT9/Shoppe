const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    cart_userId:{ type:String, require:true },
    cart_products:{type:Array, default:[]},
    cart_count_product:{ type:Number, default:0 }
},{
    timestamps:true, 
    collection:'cart'
})

const productCartSchema = new Schema({
    cart_userId:{ type:String, require:true },
    product_userId:{ type:String, require:true },
    products:{ type:Array, default:[] }
},{
    timeseries:true,
    collection:'cart_item'
})

module.exports = {
    cartModel: mongoose.model('cart', CartSchema),
    productCartModel: mongoose.model('cart_item', productCartSchema)
}
