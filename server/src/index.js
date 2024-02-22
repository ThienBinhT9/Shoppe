const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser') 
const helmet = require('helmet')
const dotenv = require('dotenv')
const compression = require('compression')
const DB = require('./configs/mongoose.config')
const router = require('./router')
   
dotenv.config()

const app = express()

//middleware
app.use(cors({
    credentials:true,
}))
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//connect DB
DB.connect()

//init router
router(app)

//create server
app.listen(process.env.PORT, () => {
    console.log(`Sever is running with PORT:${process.env.PORT}`);
})
