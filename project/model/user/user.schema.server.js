/**
 * Created by sidharththapar on 6/11/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    role:{type: String,
        default: 'READER',
        enum: ['READER', 'ADMIN', 'PUBLISHER']},
    google: {
        id:    String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    },
    articles: [{type:mongoose.Schema.Types.ObjectId, ref: "PostModel"}],
    subscriptions: [{type:mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followers: [{type:mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    followedBy: [{type:mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    //comments: [{type:mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;