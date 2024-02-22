const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')

const { findKeyByUserId } = require('../model/repo/key.repo')

dotenv.config()

const verify = async(req, res, next) => {
    
}

const authorization = async(req, res, next) => {
    try {

        const access_token = req.headers[process.env.ACCESS_TOKEN]?.toString()
        if(!access_token) return res.status(404).json('not found access_token')

        const client_id = req.headers[process.env['X-CLIENT-ID']]?.toString()
        if(!client_id) return res.status(401).json('not found clientId')

        const key = await findKeyByUserId(client_id)
        if(!key) return res.status(401).json('Bạn không có quyền')

        JWT.verify(access_token, key.key_public, (err, payload) => {
            if(err) return res.status(401).json('Bạn không có quyền')
            
            if(payload.user_id !== client_id) return res.status(401).json('Bạn không có quyền')

            req.key = key
            req.access_token = access_token
            req.user_id = payload.user_id
            return next()
            
        })


    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { authorization }