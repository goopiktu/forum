var express = require('express');
const signupController = require('../controllers/signupController');
const homepageController = require('../controllers/homepageController');
const editCreateController = require('../controllers/editCreateController');
const viewPostController = require('../controllers/viewPostController');
const viewProfileController = require('../controllers/viewProfileController');
const signinController = require('../controllers/signinController');

const app = express();

const db = require('../models/db.js');
const passport = require('passport');
const initializePassport = require('../passport-config.js');
const flash = require('express-flash');
const session = require('express-session');
const User = require('../models/UserModel');

initializePassport( 
    passport,
    async (username) => await db.findOne(User, { username: username }, { username: 1, password: 1 }),
    async (id) => await db.findOne(User, { _id: id }, { _id: 1 })
    
    // email => users.find(user => user.email === email),
    // id => users.find(user => user.id === id)
);

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

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
app.get('/viewPost/:id/:value/editComment', editCreateController.getEditComment);
app.post('/viewPost/:id/:value/editComment', editCreateController.postEditComment);
app.delete('/viewPost/:id/:value/deleteComment', editCreateController.deleteComment)

//ViewPost 
app.get('/viewPost/:id',viewPostController.viewPost);
app.post('/viewPost/:id',viewPostController.deletePost);

//ViewProfile
app.get('/profile', viewProfileController.viewProfile);
app.get('/profile/recentPosts', viewProfileController.sortRecent);
app.get('/profile/popularPosts', viewProfileController.sortPopular);

module.exports = app;