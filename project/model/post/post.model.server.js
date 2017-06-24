var mongoose = require('mongoose');
var postSchema = require('./post.schema.server');
var postModel = mongoose.model('PostModel', postSchema);
var userModel = require('../user/user.model.server');

postModel.createPost = createPost;

postModel.findUserById = findUserById;
postModel.findAllUsers = findAllUsers;
postModel.findUserByUsername = findUserByUsername;
postModel.findUserByCredentials = findUserByCredentials;
postModel.updateUser = updateUser;
postModel.deleteUser = deleteUser;
postModel.addWebsite = addWebsite;
postModel.deleteWebsite = deleteWebsite;

module.exports = postModel;

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

