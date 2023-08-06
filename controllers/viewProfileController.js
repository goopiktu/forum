const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    viewProfile: async function (req, res) {

        var currentUser = await db.findOne(User,{_id: req.user.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts =  await db.findMany(Post,{username: currentUser.username});
        } catch (err){
            res.status(500).send(err);
        }

        var indexes = [];
        var upvotes = 0; 


        for (let i = 0; i < userPosts.length; i++){
            console.log(userPosts[i]);
            upvotes += userPosts[i].upvote;
            for(let j = 0; j < allPosts.length; j++){
                if (String(userPosts[i]._id) === String(allPosts[j]._id)){
                    indexes[i] = j;
                }
            }
        }

        const user = {
            username: currentUser.username,
            description: currentUser.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: currentUser.comments,
            upvotes: upvotes,
            profpicture: currentUser.profpicture, 
            layout: 'profile'
        }
        res.render('profile', user);
    },

    sortRecent : async function (req, res){

        var currentUser = await db.findOne(User,{_id: req.user.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts = await db.findMany(Post,{username: currentUser.username});
            sortedRecentPosts = userPosts.sort(
                (p1, p2)=>(p1.datePosted<p2.datePosted) ? 1 : 
                (p1.datePosted>p2.datePosted) ? -1 : 0
            );
        } catch (err){
            res.status(500).send(err);
        }

        
        var indexes = [];
        var upvotes = 0; 


        for (let i = 0; i < userPosts.length; i++){
            console.log(userPosts[i]);
            upvotes += userPosts[i].upvote;
            for(let j = 0; j < allPosts.length; j++){
                if (String(userPosts[i]._id) === String(allPosts[j]._id)){
                    indexes[i] = j;
                }
            }
        }
        
        const user = {
            username: currentUser.username,
            description: currentUser.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: currentUser.comments,
            upvotes: upvotes,
            profpicture: currentUser.profpicture, 
            layout: 'profile'
        }
        res.render('profile', user);
    },

    sortPopular : async function (req, res){
        db.findOne(User,{_id: req.user.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts = await db.findMany(Post,{username: currentUser.username});
            sortedRecentPosts = userPosts.sort(
                (p1, p2)=>(p1.upvote<p2.upvote) ? 1 : 
                (p1.upvote>p2.upvote) ? -1 : 0
            );
        } catch (err){
            res.status(500).send(err);
        }
        
        var indexes = [];
        var upvotes = 0; 


        for (let i = 0; i < userPosts.length; i++){
            console.log(userPosts[i]);
            upvotes += userPosts[i].upvote;
            for(let j = 0; j < allPosts.length; j++){
                if (String(userPosts[i]._id) === String(allPosts[j]._id)){
                    indexes[i] = j;
                }
            }
        }
        
        const user = {
            username: currentUser.username,
            description: currentUser.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: currentUser.comments,
            upvotes: upvotes,
            profpicture: currentUser.profpicture, 
            layout: 'profile'
        }
        res.render('profile', user);
    }
}

module.exports = viewProfileController;