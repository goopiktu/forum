var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Varlidation Functions
function validateFieldsReg(email, username, password, confirm) {
  if (email === "" || username === "") {
      // showError(errorIncomplete);
      return false;
  }
  if (password === "" || password.length < 8) {
      // showError(errorIncomplete);
      return false;
  }
  if (confirm === "") {
      // showError(errorIncomplete);
      return false;
  }
  if (password !== confirm) {
      // showError(errorNotMatch);
      return false;
  }
  // if (!uniqueUsername(username)){
  //   return false;
  // }
  return true;
}

function validateFieldCreatePost(title, body) {
  if (title === "") {
      return false;
  }
  if (body === "") {
      return false;
  }
  return true;
}

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

const myDB = client.db("node_forum");

var express = require('express');
var router = express.Router();

var currentUser = "guest"; 

router.post('/', async (req, res) => {
    // console.log(req.body.username);
    try {
      const myColl = myDB.collection("userinfo");
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
      });
      let result = await promise;
      
      const query = await myColl.find({username: req.body.username, password: req.body.password});  
      for await (const doc of query) {
        password = doc.password;
        username = doc.username;
      }
  
      if (password === req.body.password && username == req.body.username) {
        currentUser = username;
        res.redirect('/logged_in');
      }
    
    } catch (error) {
      console.log("Incorrect Username or Password");
      res.redirect('/');
}});

router.post('/register', (req, res) => {
    //Add to database
    const myColl = myDB.collection("userinfo");
    
    let newUser = new userinfo({  
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirm: req.body.confirm
    });
    if (validateFieldsReg(req.body.email,req.body.username,req.body.password,req.body.confirm)){
      myColl.insertOne(newUser);
      console.log("added user?");
      res.redirect('/');
    }
    res.redirect('/register');
    // req
});

router.post('/createPost', (req, res) => {
    //Add to database
    const myColl = myDB.collection("userposts");
  
    let newPost = new postinfo({
      username: "Current User", 
      title: req.body.title,
      datePosted: new Date(), 
      body: req.body.postBody, 
      edited: 0, 
      upvote: 0, 
      downvote: 0, 
      comments: [
        {
          username: "Current User", 
          datePosted: new Date(), 
          body: "test comment", 
          edited: 0, 
          upvote: 2, 
          downvote: 3
        }
      ]
    });
    if (validateFieldCreatePost(req.body.title, req.body.postBody)){
      myColl.insertOne(newPost);
      console.log(req.body.title);
      console.log("added post?");
      res.redirect('/logged_in');
    }
    res.redirect('/createPost');
    // req
});

router.get('/viewpostTemp', (req, res) => {
  var data = {
    username: "nootdoot", 
    title: "Goblin",
    datePosted: "June 7, 2023",
    body:"This part here can ow HTML tags",
    edited:"(edited)", 
    upvote: 3, 
    downvote: 35, 
    commentUsername: "pootTroot", 
    dateCommented: "Dat", 
    comment: "my PrEciOussss", 
    commentEdited: Number, 
    upvcommentUpvoteote: 0, 
    commentDownvote: 0
  }
  res.render('viewpostTemp', data)
  // res.sendFile('views/viewpostTemp.html', { root: __dirname });
});

module.exports.router = router;
module.exports.currentUser = currentUser;
console.log("imported router");
