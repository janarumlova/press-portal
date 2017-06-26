var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findAllPublishers = findAllPublishers;
userModel.findAllReaders = findAllReaders;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addPost = addPost;
userModel.deletePost = deletePost;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.findUserByFacebookId = findUserByFacebookId;




module.exports = userModel;



function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findUserById(userId) {
    return userModel.findOne({_id: userId})
};

function findAllUsers() {
    return userModel.find();
}
function findAllPublishers() {
    return userModel.find({role: "PUBLISHER"});
}
function findAllReaders() {
    return userModel.find({role: "READER"});
}
function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function createUser(user) {
    return userModel.create(user);
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function deletePost(userId, postId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.posts.indexOf(postId);
            user.posts.splice(index, 1);
            return user.save();
        });
}

// userId is the parent
// postId is the child
function addPost(userId, postId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.posts.push(postId);
            return user.save();
        });
}

