var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postModel = mongoose.model('PostModel', postSchema);
var userModel = require('../user/user.model.server');

postModel.createPost = createPost;
postModel.findPostsByPublisher = findPostsByPublisher;
postModel.findPostById = findPostById;
postModel.findAllPosts = findAllPosts;
postModel.findPostsByIds = findPostsByIds;

postModel.findUserById = findUserById;
postModel.findAllUsers = findAllUsers;
postModel.findUserByUsername = findUserByUsername;
postModel.findUserByCredentials = findUserByCredentials;
postModel.updateUser = updateUser;
postModel.deleteUser = deleteUser;
postModel.updatePostByPublisher = updatePostByPublisher;
postModel.deletePost = deletePost;
postModel.deleteComment = deleteComment;
postModel.addComment = addComment;

module.exports = postModel;

function addComment(postId, commentId) {
    return postModel
        .findById(postId)
        .then(function (post) {
            post.comments.push(commentId);
            return post.save();
        });
}

function deletePost(userId, postId) {
    return postModel
        .remove({_id: postId})
        .then(function (status) {
            return userModel
                .deletePost(userId, postId);
        })
}

function deleteComment(postId, commentId) {
    return postModel
        .findById(postId)
        .then(function (post) {
            var index = post.comments.indexOf(commentId);
            post.comments.splice(index, 1);
            return post.save();
        });
}

function findPostsByIds(posts) {
    return postModel
        .find({
            '_id': {$in: posts}
        }, function(err, docs) {
            console.log(docs);
        });
}

function findAllPosts() {
    return postModel.find();
}

function findPostById(postId) {
    return postModel
        .findOne({_id: postId})
        .populate('_publisher')
        .exec();
}

function findPostsByPublisher(userId) {
    return postModel.find({_publisher: userId});
}

function createPost(usedId, post) {
    return postModel
        .create(post)
        .then(function (post) {
            return userModel
                .addPost(usedId, post._id)
        })
}

function findUserById(userId) {
    return postModel.findById(userId);
}

function findAllUsers() {
    return postModel.find();
}

function findUserByUsername(username) {
    return postModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return postModel.findOne({username: username, password: password});
}

function updatePostByPublisher(postId, updatedPost) {
    return postModel.update({_id: postId}, {$set: updatedPost})
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    return postModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return postModel.remove({_id: userId});
}


