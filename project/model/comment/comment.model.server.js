var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('CommentModel', commentSchema);
var postModel = require('../post/post.model.server');

commentModel.createPost = createPost;
commentModel.findPostsByPublisher = findPostsByPublisher;
commentModel.findPostById = findPostById;
commentModel.findAllPosts = findAllPosts;
commentModel.findPostsByIds = findPostsByIds;

commentModel.findUserById = findUserById;
commentModel.findAllUsers = findAllUsers;
commentModel.findUserByUsername = findUserByUsername;
commentModel.findUserByCredentials = findUserByCredentials;
commentModel.updateUser = updateUser;
commentModel.deleteUser = deleteUser;
commentModel.addWebsite = addWebsite;
commentModel.deleteWebsite = deleteWebsite;
commentModel.updatePostByPublisher = updatePostByPublisher;
commentModel.deletePost = deletePost;


module.exports = commentModel;

function deletePost(userId, postId) {
    return postModel
        .remove({_id: postId})
        .then(function (status) {
            return userModel
                .deletePost(userId, postId);
        })
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

function deleteWebsite(userId, websiteId) {
    return postModel
        .findById(userId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

// userId is the parent
// websiteId is the child
function addWebsite(userId, websiteId) {
    return postModel
        .findById(userId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

