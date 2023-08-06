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
        var online;
        var userid; 

        if (req.user)
        {
            var currentUser = await db.findOne(User,{_id: req.user.id},{})
            userid = req.user.id;

            console.log("current user" + currentUser.username);
            online = currentUser.username
        } else {

            console.log("guest view");
            online = 0;

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
            userid: userid,
            totalcomments: allPosts[id].comments.length,
            postID: id,
            tier: 1,
            layout: 'viewPost',
        }
        res.render("viewPosts", info);
    },

    deletePost: async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var id = req.params.id;
        var resultPostID = allPosts[id]._id;

        var success = await db.deleteOne(Post, {_id: resultPostID});
        if( success ){
            console.log('post sucessfully deleteed');
            res.redirect('/homepage');
        }
        else{
            console.log('post not deleted');
            // res.render("editPost", {layout: 'editCreate'});
            res.redirect('/viewpost/' + id);
        }

        console.log("delete post");
    }
};

module.exports = viewPostController;