var express = require('express');
const signupController = require('../controllers/signupController');
const homepageController = require('../controllers/homepageController');
const editCreateController = require('../controllers/editCreateController');
const viewPostController = require('../controllers/viewPostController');
const viewProfileController = require('../controllers/viewProfileController');
const signinController = require('../controllers/signinController');

const app = express();

//SignIn
app.get('/', signinController.getSignIn);
app.post('/', signinController.postSignIn);

//SignUp
app.get('/signUp', signupController.getSignUp);
app.post('/signUp', signupController.postSignUp);

//Homepage
app.get('/homepage', homepageController.guestView);
app.get('/recentPosts', homepageController.sortRecent);
app.get('/popularPosts', homepageController.sortPopular);

//CreatePost
app.get('/createPost', editCreateController.getCreatePost);
app.post('/createPost', editCreateController.postCreatePost);

//EditPost
app.get('/viewPost/:id/editPost', editCreateController.getEditPost);
app.post('/viewPost/:id/editPost', editCreateController.postEditPost);

//CreateComment
app.get('/viewPost/:id/createComment', editCreateController.getCreateComment);
app.post('/viewPost/:id/createComment', editCreateController.postCreateComment);

//EditComment
app.get('/viewPost/:id/editComment', editCreateController.getEditComment);
app.post('/viewPost/:id/editComment', editCreateController.postEditComment);

//ViewPost 
app.get('/viewPost/:id',viewPostController.viewPost);

//ViewProfile
app.get('/profile', viewProfileController.viewProfile);
app.get('/profile/:user', viewProfileController.viewProfile);


module.exports = app;