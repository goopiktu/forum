var express = require('express');
var router = express.Router();
var schemas = require('../models/schemas');


schemas.userposts.collection.insertOne();

