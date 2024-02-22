const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment_productId:{ type:String, require:true },
    comment_userId:{type:String, require:true},
    comment_content:{type:String, default:'text'},
    comment_left:{type:Number, default: 0},
    comment_right:{type:Number, default: 0},
    comment_parentId:{type:String, default:null},
    isDeleted:{type:Boolean, default:false}
},{
    timestamps:true,
    collection:'comment'
})

module.exports = mongoose.model('comment', CommentSchema)
