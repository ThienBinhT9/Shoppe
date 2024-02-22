const discountModel = require('../discount.model')

const getDiscountById = async(id) => {
    return await discountModel.findById(id).lean()
}

const GetDiscountAmount = async(user_id, discount_id, totlePrice) => {
    try {
        const foundDiscount = await getDiscountById(discount_id)
        if(!foundDiscount) return

        const {
            discount_end_day,
            discount_is_active,
            discount_min_order_value,
            discount_quanlity_used,
            discount_max_uses,
            discount_max_uses_per_user,
            discount_users_used,
            discount_type,
            discount_value
        } = foundDiscount

        if(new Date() > new Date(discount_end_day)){
            // return res.status(401).json('Discount đã hết hạn sử dụng!')
            return
        }

        if(discount_min_order_value > Number(totlePrice)){
            return
            // return res.status(401).json('Giá trị đơn hàng tối thiểu chưa đủ!')
        }

        if(!discount_is_active){
            return
            // return res.status(401).json('Discount không còn hoạt động!')
        }

        if(discount_quanlity_used >= discount_max_uses){
            return
            // return res.status(401).json('Discount này đã hết lượt sử dụng')
        }

        const userUseDiscount = discount_users_used.find(item => item?.userId === user_id)
        if(Number(userUseDiscount?.used) >= discount_max_uses_per_user){
            return
            // return res.status(401).json('Số lần sử dụng đã hết!')
        }

        const reducedValue = discount_type === 'fixed_amount' ? Number(discount_value) : Math.ceil(totlePrice/discount_value)
        return reducedValue
        // return res.status(200).json(reducedValue)
    } catch (error) {
        return error.message
    }
}

module.exports = {getDiscountById, GetDiscountAmount}