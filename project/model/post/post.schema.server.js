/**
 * Created by sidharththapar on 6/11/17.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    url: String,
    urlToImage: String,
    comments: [{type:mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "post"});

module.exports = postSchema;