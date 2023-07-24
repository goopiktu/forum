var mongoose = require('mongoose');

// Comments
var CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    edited: {
        type: Number,
        required: true     
    },
    upvote: {
        type: Number,
        required: true
    },
    downvote: {
        type: Number,
        required: true
    }
});

//export
module.exports = mongoose.Schema('Comment', CommentSchema);