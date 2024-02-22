const ProductModel = require('../product.model')


const getProducts = async(query, page = 1, limit = 10, select = 'product_name product_thumb product_price product_quantity product_attributes') => {
    try {
        
        let skip = (page - 1) * limit
        const products = await ProductModel.find(query)
        .limit(limit)
        .skip(skip)
        .sort({createdAt:-1})
        .select(select)
        .lean()

        return products
    } catch (error) {
        console.log(error.message);
    }
}

const findProductById = async(id) => {
    try {
        return await ProductModel.findById(id).lean()
    } catch (error) {
        console.log(error.message);
    }
}

const createProduct = async(body) => {
    try {
        return await ProductModel.create(body)
    } catch (error) {
        console.log(error.message);
    }
}

const removeProductById = async(id) => {
    try {
        return await ProductModel.findByIdAndRemove(id)
    } catch (error) {
        return error.message
    }
}

const checkProductBySever = async(products = []) => {
    const promises = products.map(async(product) => {
        const foundProduct = await ProductModel.findById(product.product_id).lean()
        if(foundProduct){
            return {
                product_id:product.product_id,
                quantity:product.quantity,
                product_price:foundProduct.product_price
            }
        }
    })

    return Promise.all(promises)
}

module.exports = { getProducts, createProduct, removeProductById, findProductById, checkProductBySever }