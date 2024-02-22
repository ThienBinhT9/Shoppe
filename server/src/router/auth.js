const router = require('express').Router()
const AuthController = require('../controllers/auth.controller');
const { authorization } = require('../middlewares')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/logout', authorization, AuthController.logout)

router.post('/refresh', AuthController.handleRefreshToken)


module.exports = router;
