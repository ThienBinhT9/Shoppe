const commentModel = require('../comment.model')

const getCommentById = async(id) => {
    return commentModel.findById(id).lean()
}

const getListComments = async({query, limit, skip}) => {
    return commentModel.find(query)
    .limit(limit)
    .skip(skip)
    .sort({comment_left: 1})
    .lean()
}

module.exports = {
    getCommentById,
    getListComments
}