const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    product_name:{type:String, require:true},
    product_images:{type:Array, default:[]},
    product_price:{type:Number, require:true},
    product_quantity:{type:Number, require:true},
    product_attributes:{type:Schema.Types.Mixed, require:true},
    product_type:{type:String, require:true, enum:['Clothing', 'Electronic', 'Footwear']},
    product_userId:{type:String, require:true, ref:'user'},
    product_rating:{
        type:Number, 
        default:4.5, 
        min:[1,'Rating must be above 1.0'],
        max:[5,'Rating must be above 5.0'],
        set: (val) => Math.round(val * 10)/10
    },
    product_description:String,
    product_thumb:{type:String, require:true},
    product_slug:String,
    isDraft:{type:Boolean, default:true, index:true, select:false},
    isPublished:{type:Boolean, default:false, index:true, select:false},

},{
    collection:'product',
    timestamps:true
})

ProductSchema.index({product_name:'text', product_description:'text'})

ProductSchema.pre('save', function(next){
    this.product_slug = slugify(this.product_name, {lower:true})
    next()
})


module.exports = mongoose.model('product', ProductSchema)