const db = require('../models/db.js');
const User = require('../models/UserModel.js');
 
const homepageController = {
    guestView : function (req, res){
        res.render("homepage", {layout: 'homepage'});
    },
   
    // dis part i am not rlly sure of ehe
    userView : function (req, res){
        res.render("homepage", {layout: 'homepage'});
    },
};

module.exports = homepageController;