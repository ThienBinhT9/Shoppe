const { findUserById, findUserByPhone, findShopByAddressOrSearch } = require('../model/repo/user.repo')
const UserModel = require('../model/user.model')
const cloudinary = require('cloudinary').v2

class UserController{
    
    async confirmSales(req, res){
        try {

            const { phone, address } = req.body
            const user = await findUserById(req.user_id)
            if(!user) return res.status(400).json('not found')

            if(user.status === 'active' || user.role.includes('SHOP')) return res.status(400).json('người dùng đã đăng kí bán hàng trước đó!')
        
            const validPhone = await findUserByPhone(phone)
            if(validPhone) return res.status(400).json('Số điện thoại đã được đăng ký trước đó!')
         
            const userAfrterUpdate = await UserModel.findByIdAndUpdate(user._id, {
                $set:{
                    status:'active',
                    phone,
                    address
                },
                $addToSet:{
                    role:'SHOP'
                }
            },{new:true})

            return res.status(200).json({
                ...userAfrterUpdate._doc,
                refresh_token:req.key.refresh_token,
                access_token:req.access_token
            })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async update(req, res) {
        try {

            const fileData = req.file

            const user = await UserModel.findOne({email:req.body.email}).lean()
            if(user){
                if(fileData) cloudinary.uploader.destroy(fileData.filename)
                return res.status(400).json('Email đã được sử dụng để đăng kí trước đó')
            }

            const userAfterUpdate = await UserModel.findByIdAndUpdate(req.user_id,{
                $set:{
                    ...req.body,
                    avatar:fileData?.path
                }
            },{new:true})

            return res.status(200).json({
                ...userAfterUpdate._doc,
                access_token:req.access_token,
                refresh_token:req.key.refresh_token
            })
            



        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getShop(req, res){
        try {
            const {q, province, district} = req.query

            const shops = await findShopByAddressOrSearch(q, province, district)

            return res.status(200).json(shops)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}


module.exports = new UserController
