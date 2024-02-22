const KeyModel = require('../key.model')

const createKey = async(key_public, key_private, refresh_token, user_id) => {
    try {
        
        const newKey = await KeyModel.findOneAndUpdate({user_id}, {
            key_private,
            key_public,
            refresh_token
        },{upsert:true, new:true})

        return newKey ? newKey.key_public : null

    } catch (error) {
        console.log('Tạo key không thành công');
    }
}

const findKeyByUserId = async(user_id) => {
    try {
        return await KeyModel.findOne({user_id}).lean()
    } catch (error) {
        return console.log('not found this key');
    }
}

const deleteKeyByUserId = async(user_id) => {
    try {
        await KeyModel.findOneAndDelete({user_id})
    } catch (error) {
        return console.log('not found this key');
    }
}

module.exports = { createKey, findKeyByUserId, deleteKeyByUserId }