var mongoose = require('mongoose');
// var CommentSchema = require('./CommentModel');

// Comments
const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
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

var PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    datePosted: {
        type: String,
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
    },
    comments: {
        type: [CommentSchema]
    }, 
    postID: {
        type : Number,
        required: true
    }, 
    currentUser: {
        type : Number,
        required: true 
    }
});

// export
module.exports = mongoose.model('userposts', PostSchema, 'userposts');