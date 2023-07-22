// imports
const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
// const http = require('http');
const mongoose = require("mongoose");
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


// mongoose.connect(uri, {
//     useNewUrlParser:true, useUnifiedTopology:true
// }, (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("successfully connected");
//     }
// });


//gsavblsplVmZKem2
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

router.get('/register', (req, res) => {
  res.sendFile('views/register.html', { root: __dirname });
});

router.get('/', (req,res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

router.get('/guest_view', (req, res) => {
  res.sendFile('views/guest_view.html', { root: __dirname });
});

router.get('/logged_in', (req, res) => {
  res.sendFile('views/logged_in.html', { root: __dirname });
});

router.get('/profile', (req, res) => {
  res.sendFile('views/profile.html', { root: __dirname });
});

router.get('/createPost', (req, res) => {
  res.sendFile('views/other/createPost.html', { root: __dirname });
});

router.get('/editProfile', (req, res) => {
  res.sendFile('views/other/editProfile.html', { root: __dirname });
});

router.get('/editComment', (req, res) => {
  res.sendFile('views/other/editComment.html', { root: __dirname });
});

router.get('/editPost', (req, res) => {
  res.sendFile('views/editPost.html', { root: __dirname });
});

router.get('/reply', (req, res) => {
  res.sendFile('views/reply.html', { root: __dirname });
});

router.get('/viewpostTemp', (req, res) => {
  res.sendFile('views/viewpostTemp.html', { root: __dirname });
});

// way to dynamically route html pages 

router.get('/post/:id', (req , res) => {
  console.log(req.params.id);
  res.sendFile('views/post/' + req.params.id + '.html', { root: __dirname });
});



// switching from sign in to register and vice versa doesnt work 

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);
 
console.log('Running at Port 3000');


// console.log("HEllo>");
async function add(head, body, list) {
  const myDB = client.db("node_forum");
  const myColl = myDB.collection("userposts");

  const doc = {Title: head, Body: body, List: list};
  const result = await myColl.insertOne(doc);
  console.log(
    'A document was inserted with the _id: ${result.insertedId}',
  );
}

// const cars = ["Saab", "Volvo", "BMW"];

// add("new", "testing", cars);




