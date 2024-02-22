const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscountSchema = new Schema({
    discount_userId:{type:String,require:true},
    discount_name:{type:String,require:true},
    discount_type:{type:String, default:'fixed_amount'}, // mặc định là số tiền hoặc có thể là %
    discount_value:{type:Number,require:true}, // 10.000đ hoặc 10%
    discount_code:{type:String, require:true}, // mã giảm giá vd:xggre4eew
    discount_start_day:{type:Date, require:true}, // ngày bắt đầu
    discount_end_day:{type:Date, require:true}, // ngày kết thúc
    discount_max_uses:{type:Number, require:true}, // tổng lượt sử dụng tối đa
    discount_quanlity_used:{type:Number, default: 0},   // số lượng discount đã sử dụng
    discount_users_used:{type:Array, default:[]},  // những user đã sử dụng discount
    discount_max_uses_per_user:{type:Number, require:true}, // số lượng cho phép tối đa sử dụng của mỗi user
    discount_min_order_value:{type:Number, require:true}, // giá trị đơn hàng tối thiểu để được áp dụng discount

    discount_is_active:{type:Boolean, default:true}, //discount có hoạt động không?
    discount_applies_type:{type:String, require:true, enum:['all','specific']}, // kiểu áp dụng cho sản phẩm
    discount_applies_products:{type:Array, default:[]} // những sản phẩm được áp dụng
})

module.exports = mongoose.model('discount', DiscountSchema)