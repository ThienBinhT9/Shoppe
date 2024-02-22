const bcrypt = require('bcrypt')
const crypto = require('crypto')
const JWT = require('jsonwebtoken')

const { findUserByEmail, findUserById } = require('../model/repo/user.repo')
const { createKey, deleteKeyByUserId, findKeyByUserId } = require('../model/repo/key.repo')
const { createToken } = require('../utils')

const keyModel = require('../model/key.model')

const User = require('../model/user.model')


class AuthController{

    async register(req, res){
        try {
            
            const {username, email, password} = req.body

            const foundUser = await findUserByEmail(email)
            if(foundUser) return res.status(400).json('Email đã được sử dụng để đăng kí trước đó!')

            const password_hash = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                username,
                email,
                password:password_hash,
                role:['USER']
            })

            if(!newUser) return res.status(400).json('Tạo tài khoản không thành công')

            const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
            })

            const tokens = createToken({user_id:newUser._id}, publicKey, privateKey)

            await createKey(publicKey, privateKey, tokens.refresh_token, newUser._id)

            return res.status(200).json({...newUser._doc,...tokens})

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body

            const user = await findUserByEmail(email)
            if(!user) return res.status(404).json('Tài khoản không tồn tại')

            const password_valid = await bcrypt.compare(password, user.password)
            if(!password_valid) return res.status(400).json('Mật khẩu không hợp lệ')

            const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
                modulusLength:4096,
                publicKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs1',
                    format: 'pem',
                },
            })

            const tokens = createToken({user_id:user._id}, publicKey, privateKey)

            await createKey(publicKey, privateKey, tokens.refresh_token, user._id)

            return res.status(200).json({
                ...user,
                ...tokens
            })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async logout(req, res) {
        try {
            const user = await findUserById(req.user_id)
            if(!user) return res.status(401).json('Bạn không có quyền')

            await deleteKeyByUserId(req.user_id)

            return res.status(200).json('Logout Successfully!')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    } 

    async handleRefreshToken(req, res) {
        try {

            const refresh_token = req.headers[process.env.REFRESH_TOKEN]?.toString()
            if(!refresh_token) return res.status(404).json('not found refresh_token')

            const client_id = req.headers[process.env['X-CLIENT-ID']]?.toString()
            if(!client_id) return res.status(401).json('bad request!')

            const key = await findKeyByUserId(client_id)
            if(!key) return res.status(401).json('Bạn không có quyền')

            JWT.verify(refresh_token, key.key_public, async(err, payload) => {
                if(err) return res.status(401).json('Token đã hết hạn!')

                if(payload.user_id !== client_id) return res.status(401).json('Bạn không có quyền')

                if(key.refresh_tokenUsed.includes(refresh_token)){
                    await deleteKeyByUserId(client_id)
                    return res.status(401).json('Vui lòng đăng nhập lại')
                }

                if(refresh_token !== key.refresh_token) return res.status(401).json('Bạn không có quyền')

                const findUser = await findUserById(client_id)
                if(!findUser) return res.status(401).json('Bạn không có quyền')

                const new_tokens = createToken({user_id:client_id}, key.key_public, key.key_private)

                await keyModel.updateOne({user_id:client_id},{
                    $set:{
                        refresh_token:new_tokens.refresh_token
                    },
                    $addToSet:{
                        refresh_tokenUsed:refresh_token
                    }
                })

                return res.status(200).json(new_tokens)

            })
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new AuthController
