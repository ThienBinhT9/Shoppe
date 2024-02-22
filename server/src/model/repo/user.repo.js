const UserModel = require('.././user.model')

const findUserByEmail = async(email) => {
    return await UserModel.findOne({email}).lean()
}

const findUserById = async(userId) => {
    return await UserModel.findById(userId).lean()
}

const findUserByPhone = async(phone) => {
    return await UserModel.findOne({phone}).lean()
}

const findShopByAddressOrSearch = async(keySearch, province, district) => {
    const query = {
        $and:[],
        role:'SHOP'
    }
    if(keySearch) query.$and.push({$text:{$search:new RegExp(keySearch)}})   
    if(province) query.$and.push({address:{$regex: new RegExp(province, 'i')}})
    if(district) query.$and.push({address:{$regex: new RegExp(district, 'i')}})
    if(!keySearch && !province && !district) query.$and.push({})
    
    return await UserModel.find(query).lean().select('username address phone')
}

module.exports = { findUserByEmail, findUserById, findUserByPhone, findShopByAddressOrSearch }