const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
 
const viewPostController = {
    viewPost: async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var id = req.params.id;

        var currentUser = await db.findMany(User,{online: 1},{})

        var online;

        if (currentUser.length === 0){

            console.log("guest viewt");
            online = 0;

        } else if (currentUser[0].username === allPosts[id].username) {

            console.log("post user online");
            online = 1;

        } else {

            console.log("post user not online");
            online = 2;

        }
        
        var info = {
            username: allPosts[id].username, 
            title:  allPosts[id].title,
            datePosted: allPosts[id].datePosted,
            body: allPosts[id].body,
            edited: allPosts[id].edited, 
            upvote: allPosts[id].upvote, 
            downvote: allPosts[id].downvote, 
            comments: allPosts[id].comments, 
            currentUser: online,
            layout: 'home'
        }
        res.render("viewPosts", info);
    },
};

module.exports = viewPostController;