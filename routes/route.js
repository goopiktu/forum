var express = require('express');
var router = express.Router();
var schemas = require('../models/schemas');


schemas.userposts.collection.insertOne();

const express = require(`express`);
const signinController = require(`../controllers/signinController`);

const app = express();

app.get('/', signinController.getSignIn);
app.post('/', signinController.postLogIn);

module.exports = app;