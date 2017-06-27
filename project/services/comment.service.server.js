var app = require('../../express');
var commentModel = require('../model/comment/comment.model.server');
app.get    ("/api/post/:postId/comment", findAllCommentsForPost);
app.get    ('/api/comment', findAllComments);

app.get    ('/api/assignment/user/:userId', findUserById);
app.post   ('/api/post/:postId/comment', createComment);

app.delete ("/api/post/:postId/comment/:commentId", deleteComment);
app.delete ("/api/admin/post/:postId/comment/:commentId", isAdmin, deleteCommentByAdmin);

app.get   ('/api/assignment/loggedIn', loggedIn);
app.get   ('/api/assignment/checkAdmin', checkAdmin);

function findAllComments(req, res) {
    commentModel
        .findAllComments()
        .then(function (users) {
            res.json(users);
        });
}

function findAllCommentsForPost(req, res) {
    commentModel
        .findAllCommentsForPost(req.params.postId)
        .then(function (comments) {
            res.json(comments);
        }, function (err) {
            res.send(err);
        });
}

function deleteComment(req, res) {
    commentModel
        .deleteComment(req.params.postId, req.params.commentId)
        .then(function (status) {
            res.send(status);
        });
}
function deleteCommentByAdmin(req, res) {
    commentModel
        .deleteCommentByAdmin(req.params.postId, req.params.commentId)
        .then(function (status) {
            res.send(status);
        });
}


function createComment(req, res) {
    var comment = req.body;
    comment.author = req.user._id;
    var postId = req.params.postId;
    commentModel
        .createComment(postId, comment)
        .then(function (comment) {
            res.json(comment);
        }, function (err) {
            res.send(err);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
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
    console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}


function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}


