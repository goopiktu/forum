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
    posts: {
        type:Number,
        required:true
    },
    comments: {
        type:Number,
        required:true
    },
    upvotes: {
        type:Number,
        required:true
    }, 
    online: {
        type:Number,
        required:true 
    }
});

// async function getUserByUsername(username) {
//     try {
//         const user = await user.findOne({ username: username });
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = mongoose.model('userinfo', UserSchema, 'userinfo');

// module.exports = getUserByUsername;