var app = require('../../express');
var postModel = require('../model/post/post.model.server');


app.post   ('/api/post', createPost);

app.get    ('/api/assignment/user', findAllUsers);
app.get    ('/api/assignment/user/:userId', findUserById);
app.put    ('/api/assignment/user/:userId', updateUser);
app.delete ('/api/assignment/user/:userId', isAdmin, deleteUser);


app.post  ('/api/assignment/login', passport.authenticate('local'), login);
app.get   ('/api/assignment/loggedIn', loggedIn);
app.get   ('/api/assignment/checkAdmin', checkAdmin);
app.post  ('/api/assignment/logout', logout);
app.post  ('/api/register', register);
app.post  ('/api/assignment/unregister', unregister);

function createPost(req, res) {
    var post = req.body;
    postModel
        .createPost(post)
        .then(function (post) {
            res.json(post);
        }, function (err) {
            res.send(err);
        });
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (err) {
                if(err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
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

function unregister(req,res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.role === 'ADMIN') {
        res.json(req.user);
    } else {
        res.send('0');
    }
}



function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedIn(req, res) {
    console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                }else {
                    done(null, false);
                }
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        });
}

function login(req, res) {
    res.json(req.user);
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                console.log(user);
                console.log(profile);
                if(user) {
                    return done(null, user);
                } else {
                    var newFacebookUser = {
                        username:  profile.name,
                        firstName: profile.name.firstName,
                        lastName:  profile.name.lastName,
                        email:     profile.name,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


