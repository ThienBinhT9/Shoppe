const ElectronicModel = require('../clothing.model')

const createElectronic = async(body) => {
    try {
        return await ElectronicModel.create(body)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {createElectronic}