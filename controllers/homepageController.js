const db = require('../models/db.js');
// const post = require('../models/PostModel.js');
 
const homepageController = {
    guestView : function (req, res){
        var info = {
            post: [
                {
                    title: "helow bost", 
                    username: "Current User", 
                    datePosted: new Date(),   
                    upvote: 2, 
                    downvote: 3
                }, 
               
            ], 
            layout: 'home'
        }
        res.render("homepage", info);
    },
   
    // dis part i am not rlly sure of ehe
    userView : function (req, res){
        res.render("homepage", {layout: 'home'});
    },
};

module.exports = homepageController;