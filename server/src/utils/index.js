const JWT = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

const createToken = (payload, key_public, key_private) => {
    
    const access_token = JWT.sign(payload, key_private, {
        algorithm:'RS256',
        expiresIn:'2h'
    })

    const refresh_token = JWT.sign(payload, key_private, {
        algorithm:'RS256',
        expiresIn:'30 days'
    })

    JWT.verify(access_token, key_public, (err, payload) => {
        if(err) console.log('verify không thành công')
        else console.log(payload);
    })

    return {access_token, refresh_token}
}

const deleteImageCloudinary = (product_thumb, product_images) => {
    if(product_thumb) cloudinary.uploader.destroy(product_thumb[0].filename)
    if(product_images){
        product_images.forEach(item => {
            cloudinary.uploader.destroy(item.filename)
        })
    }
}

module.exports = { createToken , deleteImageCloudinary}
