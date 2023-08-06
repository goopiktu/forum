const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
 
const homepageController = {
    guestView : async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        if(req.user)
        {
            var id = req.user.id;

            currentUser = await db.findOne(User,{_id: req.user.id},{})
            console.log(currentUser);

            var info = {
                user: currentUser,
                id: currentUser._id,
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
            console.log ('this is the user id ' + req.user.id);
        } else {

            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
        }
        res.render("homepage", info);
    },
   
    // TO BE UPDATED
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
        
        if(req.user)
        {
            var id = req.user.id;

            currentUser = await db.findOne(User,{_id: req.user.id},{})
            console.log(currentUser);

            var info = {
                user: currentUser,
                id: currentUser._id,
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
            console.log ('this is the user id ' + req.user.id);
        } else {

            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
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
        
        if(req.user)
        {
            var id = req.user.id;

            currentUser = await db.findOne(User,{_id: req.user.id},{})
            console.log(currentUser);

            var info = {
                user: currentUser,
                id: currentUser._id,
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
            console.log ('this is the user id ' + req.user.id);
        } else {

            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
        }
        res.render("homepage", info);
    }
};

module.exports = homepageController;