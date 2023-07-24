const db = require('../models/db.js');
const User = require('../models/UserModel.js');
 
const editCreateController = {
    createPost : function (req, res){
        res.render("createPost", {layout: 'editCreate'});
    },
   
    // dis part i am not rlly sure of ehe
    editPost : function (req, res){
        res.render("editPost", {layout: 'editCreate'});
    },

    createComment : function (req, res){
        res.render("createComment", {layout: 'editCreate'});
    },

    editComment : function (req, res){
        res.render("editComment", {layout: 'editCreate'});
    },
};

module.exports = editCreateController;