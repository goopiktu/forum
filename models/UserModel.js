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
    }
    //maybe later add prof pic? 
});

module.exports = mongoose.model('User',UserSchema);