const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        max:20,
        min:2,
        require:true
    },
    email:{
        type:String,
        max:50,
        require:true,
        unique:true
    },
    password:{
        type:String,
        max:12,
        min:6,
        require:true
    },
    avatar:{
        type:String,
        default:'https://i.stack.imgur.com/bl1g5.png?s=192&g=1'
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default:'inactive'
    },
    role:{
        type:Array,
        default:[]
    },
    verify:{
        type:Boolean,
        default:true
    },
    phone:String,
    address:String,
},{
    collection:'user',
    timestamps:true
})

UserSchema.index({address:'text', username:'text'})

module.exports = mongoose.model('user', UserSchema)
