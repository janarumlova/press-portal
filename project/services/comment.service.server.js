var app = require('../../express');
var commentModel = require('../model/comment/comment.model.server');


app.post   ('/api/post', createPost);

app.get    ('/api/assignment/user', findAllUsers);
app.get    ('/api/assignment/user/:userId', findUserById);
app.put    ('/api/assignment/user/:userId', updateUser);
app.delete ('/api/assignment/user/:userId', isAdmin, deleteUser);


app.get   ('/api/assignment/loggedIn', loggedIn);
app.get   ('/api/assignment/checkAdmin', checkAdmin);

function createPost(req, res) {
    var post = req.body;
    post._publisher = req.user._id;
    postModel
        .createPost(post)
        .then(function (post) {
            res.json(post);
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

function findAllUsers(req, res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}

function updateUser(req, res) {
    userModel
        .updateUser(req.params.userId, req.body)
        .then(function (status) {
            res.send(status);
        });
}
