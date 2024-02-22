const commentModel = require('../model/comment.model')
const { getCommentById, getListComments } = require('../model/repo/comment.repo')
const { findProductById } = require('../model/repo/product.repo')

class CommentController{
        
    async createComment(req, res){
        try {
            const {comment_productId, comment_content, comment_parentId = null} = req.body
            const newComment = await commentModel({
                comment_productId,
                comment_content,
                comment_parentId,
                comment_userId:req.user_id,
            })

            let rightValue 
            if(comment_parentId){
                const commentParent = await getCommentById(comment_parentId)
                if(!commentParent) return res.status(404).json('NotFound Comment')

                rightValue = commentParent.comment_right 

                await commentModel.updateMany({
                    comment_productId,
                    comment_right:{$gte: rightValue}
                },{
                    $inc:{ comment_right: 2}
                })

                await commentModel.updateMany({
                    comment_productId,
                    comment_left:{$gt: rightValue}
                },{
                    $inc:{comment_left: 2}
                })
            }else{
                const maxRightValue = await commentModel.findOne({comment_productId},'comment_right', {
                    sort:{comment_right:-1}
                }).lean()

                if(maxRightValue){
                    rightValue = maxRightValue.comment_right + 1
                }else{
                    rightValue = 1
                }
            }

            newComment.comment_left = rightValue
            newComment.comment_right = rightValue + 1

            await newComment.save()
            return res.status(200).json(newComment)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async getListComment(req, res) {
        try {
            const { comment_productId, comment_parentId = null } = req.params
            const { page = 1 } = req.query

            const query = { comment_productId }
            const limit = 10
            const skip = (page - 1) * limit

            if(comment_parentId){
                const commentParent = await getCommentById(comment_parentId)
                query.comment_parentId = { $eq: comment_parentId }
                query.comment_left = { $gt: commentParent?.comment_left }
                query.comment_right = { $lt: commentParent?.comment_right }
            }else{
                query.comment_parentId = { $eq:null }
            }
      
            const comments = await getListComments({query, limit, skip})
            return res.status(200).json(comments)
            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    async deleteComment(req, res) {
        try {
            const {comment_productId, comment_id} = req.body

            const product = await findProductById(comment_productId)
            if(!product) return res.status(404).json('NotFound product')

            const comment = await getCommentById(comment_id)
            if(!commentParent) return res.status(404).json('NotFound comment parent')

            const width = comment.comment_right - comment.comment_left + 1

            //Xóa các comment có left và right trong khoảng của comment cần xóa
            await commentModel.deleteMany({
                comment_productId,
                comment_left:{ $gte: comment.comment_left},
                comment_right:{ $lte: comment.comment_right}
            }).lean()

            //Cập nhật các giá trị left và right
            await commentModel.updateMany({
                comment_productId,
                comment_right:{ $gt: comment.comment_right}
            },{
                $inc:{
                    comment_right: -width
                }
            }).lean()

            await commentModel.updateMany({
                comment_productId,
                comment_left:{ $gt: comment.comment_right}
            },{
                $inc:{
                    comment_left: -width
                }
            }).lean()

            return res.status(200).json('Delete comment successfully')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = new CommentController
