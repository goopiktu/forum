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
const methodOverride = require('method-override');

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

app.use(methodOverride('_method'))

//SignIn
app.get('/', checkNotAuthenticated, signinController.getSignIn);
app.post('/', checkNotAuthenticated, signinController.postSignIn);

//SignUp
app.get('/signUp', checkNotAuthenticated, signupController.getSignUp);
app.post('/signUp', checkNotAuthenticated, signupController.postSignUp);

//Homepage
app.get('/homepage', homepageController.guestView);
app.get('/recentPosts', homepageController.sortRecent);
app.get('/popularPosts', homepageController.sortPopular);

//CreatePost
app.get('/createPost', checkAuthenticated, editCreateController.getCreatePost);
app.post('/createPost', checkAuthenticated, editCreateController.postCreatePost);

//EditPost
app.get('/viewPost/:id/editPost', editCreateController.getEditPost);
app.post('/viewPost/:id/editPost', editCreateController.postEditPost);

//CreateComment
app.get('/viewPost/:id/createComment', checkAuthenticated, editCreateController.getCreateComment);
app.post('/viewPost/:id/createComment', checkAuthenticated, editCreateController.postCreateComment);

//EditComment
app.get('/viewPost/:id/:value/editComment', checkAuthenticated, editCreateController.getEditComment);
app.post('/viewPost/:id/:value/editComment', checkAuthenticated, editCreateController.postEditComment);
app.delete('/viewPost/:id/:value/deleteComment', checkAuthenticated, editCreateController.deleteComment)

//ViewPost 
app.get('/viewPost/:id',viewPostController.viewPost);
app.post('/viewPost/:id',viewPostController.deletePost);

//ViewProfile
app.get('/profile', checkAuthenticated, viewProfileController.viewProfile);


app.delete('/logout', (req, res) => {
    req.logOut( (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/")
        }
    });
    // res.redirect('/');
});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/homepage')
    }
    next()
}

module.exports = app;