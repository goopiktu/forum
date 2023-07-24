var express = require('express');
const signinController = require('../controllers/signinController');



const app = express();

app.get('/', signinController.getSignIn);
app.post('/', signinController.postSignIn);

module.exports = app;