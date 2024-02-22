const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Connect to DB Successfully');
    } catch (error) {
        console.log('Connect to DB failed');
    }
}

module.exports = { connect }