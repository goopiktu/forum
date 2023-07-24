
// imports
const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

// MongoDB
// const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://aldwin:gsavblsplVmZKem2@forumcluster.xn9ni4j.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Testing Stuff 
// mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
//     if(err) throw err
//     console.log("Connected")
// })

// Assets 
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

// Handlebars 
app.engine("hbs", exphbs.engine({extname: "hbs"}));
app.set("view engine", "hbs");
// app.set("views", "./views");

// Routers GET
router.get('/', (req,res) => {
    res.sendFile('views/index.html', { root: __dirname });
});

router.get('/register', (req, res) => {
    res.sendFile('views/register.html', { root: __dirname });
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

router.get('/editPost', (req, res) => { // FIX VISUAL OF EDIT POST
    res.sendFile('views/other/editPost.html', { root: __dirname });
});

router.get('/reply', (req, res) => {
    res.sendFile('views/other/reply.html', { root: __dirname });
});

// router.get('/viewpostTemp', (req, res) => {
//     res.sendFile('views/viewpostTemp.html', { root: __dirname });
// });


// ROUTER POST
// const myDB = client.db("node_forum");

// router.post('/', async (req, res) => {
//     // console.log(req.body.username);
//     try {
//       const myColl = myDB.collection("userinfo");
//       let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve("done!"), 1000)
//       });
//       let result = await promise;
      
//       const query = await myColl.find({username: req.body.username, password: req.body.password});  
//       for await (const doc of query) {
//         password = doc.password;
//         username = doc.username;
//       }
  
//       if (password === req.body.password && username == req.body.username) {
//         currentUser = username;
//         res.redirect('/logged_in');
//       }
    
//     } catch (error) {
//       console.log("Incorrect Username or Password");
//       res.redirect('/');
//     }
// });

// router.post('/register', (req, res) => {
//     //Add to database
//     const myColl = myDB.collection("userinfo");
    
//     let newUser = new userinfo({  
//       email: req.body.email,
//       username: req.body.username,
//       password: req.body.password,
//       confirm: req.body.confirm
//     });
//     if (lib.validateFieldsReg(req.body.email,req.body.username,req.body.password,req.body.confirm)){
//       myColl.insertOne(newUser);
//       console.log("added user?");
//       res.redirect('/');
//     }
//     res.redirect('/register');
//     // req
// });

// router.post('/createPost', (req, res) => {
//     //Add to database
//     const myColl = myDB.collection("userposts");
  
//     let newPost = new postinfo({
//       username: "Current User", 
//       title: req.body.title,
//       datePosted: new Date(), 
//       body: req.body.postBody, 
//       edited: 0, 
//       upvote: 0, 
//       downvote: 0, 
//       comments: [
//         {
//           username: "Current User", 
//           datePosted: new Date(), 
//           body: "test comment", 
//           edited: 0, 
//           upvote: 2, 
//           downvote: 3
//         }
//       ]
//     });
//     if (lib.validateFieldCreatePost(req.body.title, req.body.postBody)){
//       myColl.insertOne(newPost);
//       console.log(req.body.title);
//       console.log("added post?");
//       res.redirect('/logged_in');
//     }
//     res.redirect('/createPost');
//     // req
// });

// const schemas = require('./public/assets/scripts/schemas.js')
// app.use(schemas)

// Add the router
app.use('/', router);

// TEST 
const routerPost = require('./routes/route.js')
const handlebars = require('./routes/mainRouters.js')
app.use('/', routerPost.router);
app.use('/', handlebars.router);

app.listen(process.env.port || 3000);
 
console.log('Running at Port 3000');

// async function returnPosts() {
//     const myDB = client.db("node_forum");
//     const myColl = myDB.collection("userposts");
//     const postResults = await myColl.find();
  
//     for await (const doc of postResults) {
//       console.log(doc);
//     }
// }

// returnPosts();
