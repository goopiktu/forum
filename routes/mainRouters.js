var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const myDB = client.db("node_forum");

var ObjectId = require('mongodb').ObjectId; 
var id = '64be5d443f993d00494ecf07';       
var o_id = new ObjectId(id);

async function returnPosts() {
    const myDB = client.db("node_forum");
    const myColl = myDB.collection("userposts");
    const postResults = await myColl.find({"title" : "testesttes"});
    for await (const doc of postResults) {
        console.log(doc);
    }
}

returnPosts();

router.get('/viewpostTemp', (req, res) =>{
    var info = {
        username: "i hate life", 
        title: "Goblin",
        datePosted: "June 20, 2023",
        body:"This part here can ow HTML tags",
        edited:"(edited)", 
        upvote: 3, 
        downvote: 35, 
        commentUsername: "pootTroot", 
        dateCommented: "Date", 
        comment: "my PrEciOussss", 
        commentEdited: Number, 
        upvcommentUpvoteote: 0, 
        commentDownvote: 0, 
        layout: 'viewpost'
    }
    res.render("index", info);
    // IDK HOW TO USE CUSTOM LAYOUT 
});

const routerPost = require('./route.js')
console.log(routerPost.currentUser);

module.exports.router = router;
console.log("imported handlebars");
// async function returnPosts() {
//     const myDB = client.db("node_forum");
//     const myColl = myDB.collection("userposts");
//     const postResults = await myColl.find();
  
//     for await (const doc of postResults) {
//       console.log(doc);
//     }
// }
  
// returnPosts();