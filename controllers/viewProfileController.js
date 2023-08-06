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
        var comment =[];
        var cIndex = 0;
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

        for(let j = 0; j < allPosts.length; j++){
            for (let k = 0; k < allPosts[j].comments.length; k++){
                if (allPosts[j].comments[k].username === currentUser.username){
                    console.log(allPosts[j].comments[k].username + 'vs' + currentUser.username);
                    comment[cIndex] = allPosts[j].comments[k]; 
                    cIndex++; 
                }
            }
        }

        console.log(comment); 

        const user = {
            username: currentUser.username,
            description: currentUser.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: comment.length,
            upvotes: upvotes,
            profpicture: currentUser.profpicture, 
            email: currentUser.email,
            comments: comment,
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
            email: currentUser.email,
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
            email: currentUser.email,
            layout: 'profile'
        }
        res.render('profile', user);
    }, 

    getEditProfile : async function (req, res){

        currentUser = await db.findOne(User,{_id: req.user.id},{})

        var info = {
            layout: 'editCreate', 
            email: currentUser.email,
            description: currentUser.description,
        }
        res.render("editProfile", info);
    }, 

    postEditProfile : async function (req, res){

        currentUser = await db.findOne(User,{_id: req.user.id},{})

        var info = {
            layout: 'editCreate', 
            email: currentUser.email,
            description: currentUser.description,
        }

        if ((req.body.email!=="") && (req.body.description!=="")){
            var success = await db.updateOne(User, {_id: req.user.id}, {
                email: req.body.email, 
                description: req.body.description, 
            });
            if( success ){
                console.log('user sucessfully updated');
                res.redirect('/profile');
            }
            else{
                console.log('user not updated');
                res.render("editProfile", info);
            }
        } else{
            console.log("Incomplete user information");
            res.render("editProfile", info);
        }
    }
}

module.exports = viewProfileController;