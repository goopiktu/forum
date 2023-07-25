const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const signinController = require('../controllers/signinController');
 
const homepageController = {
    view : async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        if (signinController.currentUser === 'guest'){
            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
        } else {
            var info = {
                user: signinController.currentUser, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
        }
        res.render("homepage", info);
    },
   
    // dis part i am not rlly sure of ehe
    userView : function (req, res){
        res.render("homepage", {layout: 'home'});
    },

    sortRecent : async function (req, res){
        var allPosts =[];
        try{
            allPosts = await db.findMany(Post,{},{});
            sortedRecentPosts = allPosts.sort(
                (p1, p2)=>(p1.datePosted<p2.datePosted) ? 1 : 
                (p1.datePosted>p2.datePosted) ? -1 : 0
            );


        } catch (err){
            res.status(500).send(err);
        }
        
        var info = {
            posts: sortedRecentPosts, 
            layout: 'home'
        }
        res.render("homepage", info);
    },

    sortPopular : async function (req, res){
        var allPosts =[];
        try{
            allPosts = await db.findMany(Post,{},{});
            sortedPopularPosts = allPosts.sort(
                (p1, p2)=>(p1.upvote<p2.upvote) ? 1 : 
                (p1.upvote>p2.upvote) ? -1 : 0
            );


        } catch (err){
            res.status(500).send(err);
        }
        
        var info = {
            posts: sortedPopularPosts, 
            layout: 'home'
        }
        res.render("homepage", info);
    }
};

module.exports = homepageController;