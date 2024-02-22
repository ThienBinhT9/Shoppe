const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KeySchema = new Schema({
    user_id:{
        type:String,
        require:true
    },
    key_public:{
        type:String,
        require:true
    },
    key_private:{
        type:String,
        require:true
    },
    refresh_token:{
        type:String
    },
    refresh_tokenUsed:{
        type:Array,
        default:[]
    }
},{
    collection:'key',
    timestamps:true
})

module.exports = mongoose.model('key', KeySchema)
