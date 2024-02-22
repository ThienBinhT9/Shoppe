const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ElectronicSchema = new Schema({
    manufacturer:{type:String, require:true},
    model:{type:String, require:true},
    color:{type:Array, default:[]},
    product_userId:{type:String, require:true, ref:'user'}
},{
    timestamps:true,
    collection:'electronic'
})

module.exports = mongoose.model('electronic', ElectronicSchema)
