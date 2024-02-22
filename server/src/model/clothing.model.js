const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClothingSchema = new Schema({
    brand:{type:String, require:true},
    size:{type:Array, default:[]},
    color:{type:Array, default:[]},
    material:{type:String, require:true},
    product_userId:{type:String, require:true, ref:'user'}
},{
    timestamps:true,
    collection:'clothing'
})

module.exports = mongoose.model('clothing', ClothingSchema)
