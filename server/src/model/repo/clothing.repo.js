const ClothingModel = require('../clothing.model')

const createClothing = async(body) => {
    try {
        return await ClothingModel.create(body)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {createClothing}