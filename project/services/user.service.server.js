var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//for password encryption
var bcrypt = require("bcrypt-nodejs");

//Facebook and Google Login
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//
// var googleConfig = {
//     clientID     : '222671963957-205m5fibvtpc223bpdsid045fd4vjg1u.apps.googleusercontent.com',
//     clientSecret : 'Gm8CnkQKjc4_SkE9-naJmnGa',
//     callbackURL  : '/auth/google/callback'
// };
//
// var facebookConfig = {
//     clientID     : '1093632250736728',
//     clientSecret : '34c72e7877802295b1a10682fdac6e85',
//     callbackURL  : '/auth/facebook/callback'
// };

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

//User Services
app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout', logout);
app.post  ('/api/register', register);
app.delete ('/api/unregister', unregister);
app.put   ('/api/updateUser', updateUserByUser);
app.post   ("/api/subscribe/:publisherId", subscribe);
app.post  ("/api/savePost", savePost);
app.post  ("/api/follow/:readerId", follow);
app.delete  ("/api/unFollow/:readerId", unFollow);
//Find Functions
app.get   ("/api/reader", findAllReaders);
app.get   ("/api/publisher", findAllPublishers);
app.get   ("/api/subscriptions", findSubscriptionsForReader);
app.get   ("/api/subscribers", findSubscribers);
app.get   ('/api/user', findAllUsers);
app.get   ('/api/user/:userId', findUserById);
app.get   ('/api/loggedIn', loggedIn);
app.get   ('/api/publisher/:publisherId', findPublisherById);
app.get   ('/api/followers', findFollowers);
app.get   ("/api/follows", findFollows);

//Admin Services
app.get   ('/api/checkAdmin', checkAdmin);
app.post  ('/api/user', isAdmin, createUser);
app.delete('/api/user/:userId', isAdmin, deleteUser);
app.put   ('/api/user/:userId', isAdmin, updateUserByAdmin);

app.get('/auth/google',
    passport.authenticate('google',
        { scope : ['profile', 'email']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/index.html#!/login'
    }));

app.get ('/auth/facebook',
    passport.authenticate('facebook',
        { scope : 'email'
        }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/index.html#!/profile',
        failureRedirect: '/index.html#!/login'
    }));

function findFollowers(req, res) {
    userModel
        .findFollowers(req.user._id)
        .then(function (followers) {
            res.json(followers);
        });
}

function findFollows(req, res) {
    userModel
        .findFollows(req.user._id)
        .then(function (following) {
            res.json(following);
        });
}
function savePost(req, res) {
    userModel
        .savePost(req.user._id, req.body)
        .then(function (status) {
            res.send(status)
        });
}

function follow(req, res) {
    userModel
        .follow(req.user._id, req.params.readerId)
        .then(function (status) {
            res.send(200)
        }, function (err) {
            res.send(err)
        });
}

function unFollow(req, res) {
    var userId = req.user._id;
    var readerId = req.params.readerId;
    userModel
        .unFollow(userId, readerId)
        .then(function (status) {
            res.json(status);
        });
}

function subscribe(req, res) {
    userModel
        .subscribe(req.user._id, req.params.publisherId)
        .then(function (response) {
            res.send(200)
        }, function (err) {
            res.send(err)
        });
}

function updateUserByUser(req, res) {
    userModel
        .updateUser(req.user._id, req.body)
        .then(function (status) {
            res.send(status);
        });
}

function findPublisherById(req, res) {
    userModel
        .findUserById(req.params.publisherId)
        .then(function (publisher) {
            res.json(publisher);
        });
}

function findAllPublishers(req, res) {
    userModel
        .findAllPublishers()
        .then(function (users) {
            console.log(users);
            res.json(users);
        });
}

function findAllReaders(req, res) {
    userModel
        .findAllReaders()
        .then(function (users) {
            res.json(users);
        });
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

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);  //Password Encryption
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
    if(req.isAuthenticated() && req.user.role === 'ADMIN') {
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

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
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
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}



function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync('abc123');    //Default Password with encryption
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findSubscriptionsForReader(req, res){
    userModel
        .findSubscriptionsForReader(req.user._id)
        .then(function (subs) {
            if(subs) {
                res.json(subs);
            } else {
                res.sendStatus(404);
            }
        });
}

function findSubscribers(req, res) {
    userModel
        .findSubscribers(req.user._id)
        .then(function (subs) {
            if(subs) {
                res.json(subs);
            } else {
                res.sendStatus(404);
            }
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

function updateUserByAdmin(req, res) {
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
                        password:  "abc123",
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
                console.log(profile);
                if(user) {
                    return done(null, user);
                } else {
                    var displayName = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username:  displayName[0],
                        firstName: displayName[0],
                        lastName:  displayName[0],
                        password:  "abc123",
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


