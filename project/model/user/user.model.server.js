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
userModel.findSubscriptionsForReader =findSubscriptionsForReader;
userModel.findSubscribers = findSubscribers;
userModel.subscribe = subscribe;
userModel.follow = follow;
userModel.addFollower = addFollower;
userModel.addsubscriber = addsubscriber;
userModel.savePost = savePost;
userModel.findFollows = findFollows;
userModel.findFollowers = findFollowers;
userModel.unFollow = unFollow;
userModel.removeFollower = removeFollower;

module.exports = userModel;



function findFollows(userId) {
    return userModel.find({'followers': userId});
}
function findFollowers(userId) {
    return userModel.find({'iFollow': userId});
}

function savePost(userId, post) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.posts.push(post);
            return user.save();
        })
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

function unFollow(userId, readerId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.iFollow.pull(readerId);
            user.save();
            return userModel
                .removeFollower(userId, readerId)
        });
}


function subscribe(subscriberId, publisherId) {
    return userModel
        .findById(subscriberId)
        .then(function (subscriber) {
            subscriber.subscriptions.push(publisherId);
            subscriber.save();
            return userModel
                .addsubscriber(subscriberId, publisherId)
        });
}

function follow(userId, readerId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.iFollow.push(readerId);
            user.save();
            return userModel
                .addFollower(userId, readerId)
        });
}

function addsubscriber(subscriberId, publisherId) {
    return userModel
        .findById(publisherId)
        .then(function (publisher) {
            publisher.subscribers.push(subscriberId);
            return publisher.save();
        })
}
function addFollower(userId, readerId) {
    return userModel
        .findById(readerId)
        .then(function (reader) {
            reader.followers.push(userId);
            return reader.save();
        })
}
function removeFollower(userId, readerId) {
    return userModel
        .findById(readerId)
        .then(function (reader) {
            reader.followers.pull(userId);
            return reader.save();
        })
}

function findSubscriptionsForReader(readerId) {
    return userModel.find({'subscribers': readerId});
}

function findSubscribers(publisherId) {
    return userModel.find({'subscriptions': publisherId});
}

function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
}

function findUserByGoogleId(googleId) {
    return userModel
        .findOne({'google.id': googleId});
}

function findUserById(userId) {
    return userModel.findOne({_id: userId})
}

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

