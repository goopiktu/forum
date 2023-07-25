const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
 
const viewPostController = {
    viewPost: async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var id = req.params.id;
        console.log(id);
        
        var info = {
            username: allPosts[id].username, 
            title:  allPosts[id].title,
            datePosted: allPosts[id].datePosted,
            body: allPosts[id].body,
            edited: allPosts[id].edited, 
            upvote: allPosts[id].upvote, 
            downvote: allPosts[id].downvote, 
            comments: allPosts[id].comments, 
            layout: 'home'
        }
        res.render("viewPosts", info);
    },
};

module.exports = viewPostController;