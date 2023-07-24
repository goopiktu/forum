var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// userinfo
const userinfoSchema = new Schema({

    email: {type:String, required:true},
    username: {type:String, required:true},
    password: {type:String, required:true},
    confirm: {type:String, required:true}
});

// Comments
const commentinfoSchema = new Schema({
    username: String, 
    datePosted: Date, 
    body: String, 
    edited: Number, 
    upvote: Number, 
    downvote: Number
})

// userpost
const postinfoSchema = new Schema({

    username: String, 
    title: String,
    datePosted: Date, 
    body: String, 
    edited: Number, 
    upvote: Number, 
    downvote: Number, 
    comments : {
      type: [commentinfoSchema]
    }
});
  
const userinfo = mongoose.model('userinfo', userinfoSchema);
const postinfo = mongoose.model('userposts', postinfoSchema);

module.exports = userinfo, postinfo;

// FOR TESTING

// let newUser = new userinfo({
//     email:"kewlemail@yahoo.com",
//     username: "nootdoot",
//     password: "banananan",
//     confirm: "banananan"
//   });
  
// const myDB = client.db("node_forum");
// const myColl = myDB.collection("userinfo");

// myColl.insertOne(newUser);
// console.log("added user?");