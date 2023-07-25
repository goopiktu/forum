const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
 
const homepageController = {
    guestView : async function (req, res){

        var allPosts;
        try{
            console.log("it entered the try");
            // console.log(db.findMany(Post,null,null));
            // console.log(db.findMany(Post,{},{}));
            allPosts = await db.findMany(Post,{},{});
            console.log(allPosts);
        } catch (err){
            // res.status(500).send(err);
        }

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