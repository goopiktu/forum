var mongoose = require('mongoose');
var schema = mongoose.Schema;

// userinfo
let userinfoSchema = new schema({

    email: {type:String, required:true},
    username: {type:String, required:true},
    password: {type:String, required:true}


});


// userpost
let userpostsSchema = new schema({

    title: {type:String, required:true},
    body_content: {type:String, required:true}

    
});

let userinfo = mongoose.model('userinfo', userinfoSchema, 'userinfo');
let userposts = mongoose.model('userposts', userpostsSchema, 'userposts');

let mySchemas = {'userinfo':userinfo, 'userposts':userposts};
module.exports = mySchemas;