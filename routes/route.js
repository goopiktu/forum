var express = require('express');
const signinController = require('../controllers/signinController');
const signupController = require('../controllers/signupController');


const app = express();

//SignIn
app.get('/', signinController.getSignIn);
app.post('/', signinController.postSignIn);

//SignUp
app.get('/', signupController.getSignUp);
app.post('/', signupController.postSignUp);

module.exports = app;