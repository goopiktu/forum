const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    viewProfile: async function (req, res) {

        if (req.user){
            var cUser = await db.findOne(User,{_id: req.user.id},{})
            currentUser = cUser.username;
        }else{
            currentUser = 0
        }

        var profile = await db.findOne(User,{username: req.params.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts =  await db.findMany(Post,{username: profile.username});
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
                if (allPosts[j].comments[k].username === profile.username){
                    console.log(allPosts[j].comments[k].username + 'vs' + profile.username);
                    comment[cIndex] = allPosts[j].comments[k]; 
                    cIndex++;
                    upvotes += allPosts[j].comments[k].upvote;
                    for (let m = 0; m < allPosts[j].comments[k].comments.length; m++){
                        if (allPosts[j].comments[k].comments[m].username === profile.username){
                            console.log(allPosts[j].comments[k].comments[m].username + 'vs' + profile.username);
                            comment[cIndex] = allPosts[j].comments[k].comments[m]; 
                            cIndex++;
                            upvotes += allPosts[j].comments[k].comments[m].upvote;
                        }
                    }
                }
            }
        }

        console.log(comment); 

        const user = {
            username: profile.username,
            description: profile.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: comment.length,
            upvotes: upvotes,
            profpicture: profile.profpicture, 
            email: profile.email,
            comments: comment,
            currrentUser: currentUser,
            layout: 'profile'
        }
        res.render('profile', user);
    },

    sortRecent : async function (req, res){

        if (req.user){
            var cUser = await db.findOne(User,{_id: req.user.id},{})
            currentUser = cUser.username;
        }else{
            currentUser = 0
        }

        var profile = await db.findOne(User,{username: req.params.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts = await db.findMany(Post,{username: profile.username});
            sortedRecentPosts = userPosts.sort(
                (p1, p2)=>(p1.datePosted<p2.datePosted) ? 1 : 
                (p1.datePosted>p2.datePosted) ? -1 : 0
            );
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
                if (allPosts[j].comments[k].username === profile.username){
                    console.log(allPosts[j].comments[k].username + 'vs' + profile.username);
                    comment[cIndex] = allPosts[j].comments[k]; 
                    cIndex++; 
                }
            }
        }

        console.log(comment); 

        const user = {
            username: profile.username,
            description: profile.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: comment.length,
            upvotes: upvotes,
            profpicture: profile.profpicture, 
            email: profile.email,
            comments: comment,
            currrentUser: currentUser,
            layout: 'profile'
        }
        res.render('profile', user);

    },

    sortPopular : async function (req, res){

        
        if (req.user){
            var cUser = await db.findOne(User,{_id: req.user.id},{})
            currentUser = cUser.username;
        }else{
            currentUser = 0
        }

        var profile = await db.findOne(User,{username: req.params.id},{})

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var userPosts;
        try{
            userPosts = await db.findMany(Post,{username: profile.username});
            sortedRecentPosts = userPosts.sort(
                (p1, p2)=>(p1.upvote<p2.upvote) ? 1 : 
                (p1.upvote>p2.upvote) ? -1 : 0
            );
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
                if (allPosts[j].comments[k].username === profile.username){
                    console.log(allPosts[j].comments[k].username + 'vs' + profile.username);
                    comment[cIndex] = allPosts[j].comments[k]; 
                    cIndex++; 
                }
            }
        }

        console.log(comment); 

        const user = {
            username: profile.username,
            description: profile.description,
            numPosts: userPosts.length,
            posts: userPosts,
            indexes: indexes, 
            numComments: comment.length,
            upvotes: upvotes,
            profpicture: profile.profpicture, 
            email: profile.email,
            comments: comment,
            currrentUser: currentUser,
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
                res.redirect('/profile/' + currentUser.username);
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