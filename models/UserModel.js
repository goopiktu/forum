var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type:String, 
        required:true
    },
    username: {
        type:String, 
        required:true
    },
    password: {
        type:String, 
        required:true
    },
    confirm: {
        type:String, 
        required:true
    },
    description: {
        type:String, 
        required:false
    },
    profpicture: {
        type:String,
        required:false
    },
    comments: {
        type:Number,
        required:true
    },
    upvotes: {
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('userinfo', UserSchema, 'userinfo');

