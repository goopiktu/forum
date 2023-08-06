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

        currentUser = await db.findOne(User,{_id: req.user.id},{})
        console.log(currentUser);

        if (currentUser){
           var info = {
                user: currentUser,
                id: currentUser._id,
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
        } else {

            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
        }
        
        console.log ('this is the user id ' + req.user.id);
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
        
        // var info = {
        //     posts: sortedRecentPosts, 
        //     layout: 'home'
        // }
        // res.render("homepage", info);

        currentUser = await db.findMany(User,{online: 1},{})

        if (currentUser.length === 0){
            var info = {
                user: 0, 
                posts: sortedRecentPosts, 
                layout: 'home'
            }
            console.log("guestView");
        } else {
            var info = {
                user: currentUser, 
                posts: sortedRecentPosts, 
                layout: 'home'
            }
            console.log(currentUser);
            console.log("userView");
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
        
        // var info = {
        //     posts: sortedPopularPosts, 
        //     layout: 'home'
        // }
        // res.render("homepage", info);

        currentUser = await db.findMany(User,{online: 1},{})

        if (currentUser.length === 0){
            var info = {
                user: 0, 
                posts: sortedPopularPosts, 
                layout: 'home'
            }
            console.log("guestView");
        } else {
            var info = {
                user: currentUser, 
                posts: sortedPopularPosts, 
                layout: 'home'
            }
            console.log(currentUser);
            console.log("userView");
        }
        res.render("homepage", info);
    }
};

module.exports = homepageController;