const db = require('../models/db.js');
const User = require('../models/UserModel.js');
 
const viewPostController = {
    viewPost : function (req, res){
        res.render("viewPosts", {layout: 'viewPost'});
    },
};

module.exports = viewPostController;