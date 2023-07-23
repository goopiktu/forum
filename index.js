// imports
const exp = require('constants');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
// const http = require('http');
var mongoose = require('mongoose');
var schema = mongoose.Schema;
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// THIS STUFF IS FOR REGISTER + SIGN UP
let errorIncomplete = "Please fill up all the fields";
let errorNotMatch = "The passwords you have entered do not match";

app.use(bodyParser.urlencoded({extended: true}));
// mongoose.connect(uri, {
//     useNewUrlParser:true, useUnifiedTopology:true
// }, (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("successfully connected");
//     }
// });


const userinfoSchema = {

  email: String,
  username: String,
  password: String,
  confirm: String
}

const userinfo = mongoose.model("userinfo", userinfoSchema);

//gsavblsplVmZKem2


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

router.get('/register', (req, res) => {
  res.sendFile('views/register.html', { root: __dirname });
});

//Add to database
const myDB = client.db("node_forum");
const myColl = myDB.collection("userinfo");

router.post('/register', (req, res) => {
  
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

// var fs = require('fs');

// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });

//======================================================================NOT SURE IF DIS SHUD BE HERE PERO BAHALA

// THIS STUFF IS FOR REGISTER + SIGN UP

/*  validateFields
    function: checks if the input is complete & if passwords match
*/
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

function uniqueUsername(name){
  testName = userinfo.find({username:name});
  if (testName !== null){
    return false;
  }
  return true;
}

