const db = require('../models/db.js');
const 

const signinController = {
    getSignIn : function (req, res){
        res.render("signIn", {layout: 'signinReg'});
    }
   

}

module.exports = controller;