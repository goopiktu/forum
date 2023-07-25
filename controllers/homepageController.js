const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
 
const homepageController = {
    guestView : async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        console.log(allPosts);
        var info = {
            posts: allPosts, 
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