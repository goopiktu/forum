const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
 
const viewPostController = {
    viewPost: async function (x, req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var x = 0;
        // console.log(allPosts[x]);
        
        var info = {
            username: allPosts[x].username, 
            title:  allPosts[x].title,
            datePosted: allPosts[x].datePosted,
            body: allPosts[x].body,
            edited: allPosts[x].edited, 
            upvote: allPosts[x].upvote, 
            downvote: allPosts[x].downvote, 
            comments: allPosts[x].comments, 
            layout: 'home'
        }
        res.render("viewPosts", info);
    },
};

module.exports = viewPostController;