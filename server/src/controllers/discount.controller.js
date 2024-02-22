const discountModel = require('../model/discount.model')

class DiscountController{

    async create(req, res){
        try {
            const { discount_code, discount_start_day, discount_end_day } = req.body

            const foundDiscount = await discountModel.findOne({discount_code, discount_userId:req.user_id}).lean()
            if(foundDiscount && foundDiscount.discount_is_active){
                return res.status(401).json('Code mã giảm giá đã tồn tại')
            }

            if(new Date() > new Date(discount_end_day) || new Date(discount_start_day) >= new Date(discount_end_day)){
                return res.status(401).json('Ngày tạo mã giảm giá không hợp lệ')
            }

            const newDiscount = await discountModel.create({
                ...req.body,
                discount_userId:req.user_id
            })

            return res.status(200).json(newDiscount)


        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getMyDiscount(req, res) {
        try {
            const discounts = await discountModel.find({
                discount_userId:req.user_id,
                discount_is_active:true
            }).lean()

            return res.status(200).json(discounts)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async deleteMyDiscount(req, res) {
        try {
            const { id } = req.params
            const discount = await discountModel.findByIdAndDelete(id).lean()
            if(!discount){
                return res.status(401).json('Not found discount!')
            }

            return res.status(200).json(discount)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    async applyDiscountToProduct(req, res) {
        try {
            const { discount_id, totlePrice } = req.body
            const foundDiscount = await discountModel.findById(discount_id).lean()
            if(!foundDiscount){
                return res.status(404).json('Not found discount')
            }

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
                return res.status(401).json('Discount đã hết hạn sử dụng!')
            }

            if(discount_min_order_value > Number(totlePrice)){
                return res.status(401).json('Giá trị đơn hàng tối thiểu chưa đủ!')
            }

            if(!discount_is_active){
                return res.status(401).json('Discount không còn hoạt động!')
            }

            if(discount_quanlity_used >= discount_max_uses){
                return res.status(401).json('Discount này đã hết lượt sử dụng')
            }

            const userUseDiscount = discount_users_used.find(item => item?.userId === req.user_id)
            if(Number(userUseDiscount?.used) >= discount_max_uses_per_user){
                return res.status(401).json('Số lần sử dụng đã hết!')
            }

            const reducedValue = discount_type === 'fixed_amount' ? Number(discount_value) : Math.ceil(totlePrice/discount_value)

            return res.status(200).json(reducedValue)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //Khi người dùng get voucher valid của shop với sản phẩm/nhiều sản phẩm
    async getDiscountOfShop(req, res) {
        try {
            const { product_userId, product_ids = [] } = req.body
            const query = {
                $and:[
                    {discount_userId:product_userId},
                    {
                        $or:[
                            {discount_applies_type:'all'},
                            {discount_applies_products: {$all: product_ids}}
                        ]
                    },
                    {discount_is_active:true},
                    {discount_end_day:{ $gte: new Date() }}
                ]
            }
            const discounts = await discountModel.find(query).lean()
            return res.status(200).json(discounts)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async updateDiscount(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

}

module.exports = new DiscountController
