const router = require('express').Router()
const CommentController = require('../controllers/comment.controller')
const { authorization } = require('../middlewares')

router.get('/:comment_productId/:comment_parentId?', CommentController.getListComment)
router.post('/', authorization, CommentController.createComment)
router.post('/delete', authorization, CommentController.deleteComment)

module.exports = router
