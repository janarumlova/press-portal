/**
 * Created by sidharththapar on 6/11/17.
 */
var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    post: {type:mongoose.Schema.Types.ObjectId, ref: "PostModel"},
    content: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "comment"});

module.exports = commentSchema;