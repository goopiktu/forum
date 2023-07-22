var mongoose = require('mongoose');
var schema = mongoose.Schema;



const db = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// const db = require('mongodb');
// const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


try {
    mongoose.connect(uri, 
        {useNewUrlParser: true, useUnifiedTopology: true},
        () => console.log(" Mongoose is connected"));
} catch (e) {
    console.log("could not connect");
}





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