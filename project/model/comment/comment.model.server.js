var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('CommentModel', commentSchema);
var postModel = require('../post/post.model.server');

commentModel.createComment = createComment;
commentModel.findAllCommentsForPost = findAllCommentsForPost;
commentModel.deleteComment = deleteComment;
commentModel.findAllComments = findAllComments;

module.exports = commentModel;

function findAllCommentsForPost(postId) {
    return commentModel.find({post: postId});
}

function findAllComments() {
    return commentModel.find();
}

function deleteComment(postId, commentId) {
    return commentModel
        .remove({_id: commentId})
        .then(function (status) {
            return postModel
                .deleteComment(postId, commentId);
        })
}

function createComment(postId, comment) {
    return commentModel
        .create(comment)
        .then(function (comment) {
            return postModel
                .addComment(postId, comment._id)
        })
}


