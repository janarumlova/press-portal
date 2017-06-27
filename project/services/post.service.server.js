var app = require('../../express');
var postModel = require('../model/post/post.model.server');

app.put    ("/api/assignment/user/:postId/edit", updatePostByPublisher);
app.post   ('/api/createPost', createPost);
app.get    ('/api/publisherPost', findPostsByPublisher);
app.get    ("/api/readerPost", findPostsForReader);
app.get    ("/api/post", findAllPosts);
app.get    ("/api/post/:postId", findPostById);
app.get    ("/api/publisher/:publisherId/display", displayPostsForPublisher);


app.delete ('/api/assignment/user/:userId', isAdmin, deleteUser);
app.delete ("/api/deletePost/:postId", deletePost);
app.delete ("/api/user/:userId/post/:postId", deletePostByAdmin);


app.get   ('/api/loggedIn', loggedIn);
app.get   ('/api/checkAdmin', checkAdmin);

function deletePost(req, res) {
    postModel
        .deletePost(req.user._id, req.params.postId)
        .then(function (status) {
            res.send(status);
        });
}
function deletePostByAdmin(req, res) {
    postModel
        .deletePost(req.params.userId, req.params.postId)
        .then(function (status) {
            res.send(status);
        });
}

function findPostById(req, res) {
    var postId = req.params.postId;
    postModel
        .findPostById(postId)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.send(err);
        });
}

function findPostsByPublisher(req, res) {
    postModel
        .findPostsByPublisher(req.user._id)
        .then(function (posts) {
            res.json(posts);
        }, function (err) {
            res.send(err);
        });
}

function displayPostsForPublisher(req, res) {
    postModel
        .findPostsByPublisher(req.params.publisherId)
        .then(function (posts) {
            res.json(posts);
        }, function (err) {
            res.send(err);
        });
}

function findAllPosts(req, res) {
    postModel
        .findAllPosts()
        .then(function (posts) {
            res.json(posts);
        });
}

function findPostsForReader(req, res) {
    postModel
        .findPostsByIds(req.user.posts)
        .then(function (posts) {
            res.json(posts);
        });
}

function createPost(req, res) {
    var post = req.body;
    post._publisher = req.user._id;
    postModel
        .createPost(req.user._id, post)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.send(err);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN') {
        next();
    }
    else {
            res.send('401');
        }
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function loggedIn(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}


function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}


function updatePostByPublisher(req, res) {
    var updatedPost = req.body;
    postModel
        .updatePostByPublisher(req.params.postId, updatedPost)
        .then(function (status) {
            res.send(status);
        });
}
