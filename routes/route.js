var express = require('express');
const signinController = require('../controllers/signinController');
const signupController = require('../controllers/signupController');
const homepageController = require('../controllers/homepageController');
const editCreateController = require('../controllers/editCreateController');
const viewPostController = require('../controllers/viewPostController');
const viewProfileController = require('../controllers/viewProfileController');

const app = express();

//SignIn
app.get('/', signinController.getSignIn);
app.post('/', signinController.postSignIn);

//SignUp
app.get('/signUp', signupController.getSignUp);
app.post('/signUp', signupController.postSignUp);

//Homepage
app.get('/homepage', homepageController.guestView);

//EditCreate 
app.get('/createPost', editCreateController.getCreatePost);
app.post('/createPost', editCreateController.postCreatePost);
app.get('/editPost', editCreateController.editPost);
app.get('/createComment', editCreateController.createComment);
app.get('/editComment', editCreateController.editComment);

//ViewPost 
app.get('/viewPost', viewPostController.viewPost);
app.get('/viewPost/:id',viewPostController.viewPost);

//ViewProfile
app.get('/profile', viewProfileController.viewProfile);


module.exports = app;