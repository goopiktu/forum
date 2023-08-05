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

            console.log("guest view");
            online = 0;

        } else {

            console.log("current user" + currentUser[0].username);
            online = currentUser[0].username

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
            totalcomments: allPosts[id].comments.length,
            layout: 'viewPost',
            postID: id,
        }
        res.render("viewPosts", info);
    },
};

module.exports = viewPostController;