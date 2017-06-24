
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: String,
    _publisher: {type:mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    description: String,
    sourceUrl: String,
    imageUrl: String,
    comments: [{type:mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "post"});

module.exports = postSchema;