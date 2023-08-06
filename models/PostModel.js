var mongoose = require('mongoose');
// var CommentSchema = require('./CommentModel');

// Comments
const CommentSchema = new mongoose.Schema();

CommentSchema.add({
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
    }, 
    comments: {
        type: [CommentSchema]
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
    },
    comments: {
        type: [CommentSchema]
    }
});

// export
module.exports = mongoose.model('userposts', PostSchema, 'userposts');