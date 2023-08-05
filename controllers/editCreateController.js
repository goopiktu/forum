const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
 
const editCreateController = {
    getCreatePost: function (req, res){
        res.render("createPost", {layout: 'editCreate'});
    },
    postCreatePost : async function (req, res){

        currentUser = await db.findMany(User,{online: 1},{})

        if (currentUser.length === 0){
            console.log("guest cannot post");
        } else {
            console.log(currentUser);
            console.log("userView");
        }

        const post = {
            username: currentUser[0].username,
            title: req.body.title,
            datePosted: new Date(),
            body: req.body.postBody,
            edited: 0,
            upvote: 0,
            downvote: 0,
            comments: [],  
            currentUser: 0
        }
        var success = await db.insertOne(Post, post);
        if( success ){
            console.log('Post successfully added');
            res.redirect('homepage');
        }
        else{
            console.log('Post not added');
            res.render("createPost", {layout: 'editCreate'});
        }
    },
   
    // dis part i am not rlly sure of ehe
    getEditPost : async function (req, res){

        var resultPost;
        var id = req.params.id;
        console.log(id);

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        resultPost = allPosts[id]
        console.log(resultPost);

        var info = {
            layout: 'editCreate', 
            title: resultPost.title,
            body: resultPost.body
        }
        res.render("editPost", info);
    },
    postEditPost : async function (req, res){
 
        var id = req.params.id;
        console.log(id);

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var resultPostID = allPosts[id]._id;
        console.log(resultPostID);

        var success = await db.updateOne(Post, {_id: resultPostID}, {
            title: req.body.title, 
            body: req.body.body, 
            edited: 1,
        });
        if( success ){
            console.log('post sucessfully updated');
            res.redirect('/viewpost/' + id);
        }
        else{
            console.log('post not updated');
            res.render("editPost", {layout: 'editCreate'});
        }
    },

    deletePost : function (req, res) {
        
    },

    getCreateComment: function (req, res){
        res.render("createComment", {layout: 'editCreate'});
    },
    postCreateComment : async function (req, res){

        var id = req.params.id;
        console.log(id);

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var resultPostID = allPosts[id]._id;
        console.log(resultPostID);

        const comment = {
            username: currentUser[0].username,
            datePosted: new Date(),
            body: req.body.post,
            edited: 0,
            upvote: 0,
            downvote: 0,
        }
        if (req.body.post!==""){
            var success = await db.updateOne(Post, {_id: resultPostID}, {
                $push: {
                    comments: comment
                }
            });
            if( success ){
                console.log('comment successfully added');
                res.redirect('/viewpost/' + id);
            }
            else{
                console.log('comment not added');
                res.render("createComment", {layout: 'editCreate'});
            }
        } else {
            console.log("You did not comment anything");
            res.render("createComment", {layout: 'editCreate'});
        }
        
    },

    getEditComment : async function (req, res){

        var id = req.params.id;
        console.log(id);

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var resultPostID = allPosts[id]._id
        var value = req.params.value;

        var resultPost = await db.findMany(Post, {_id: resultPostID},{});
        console.log(resultPost);

        console.log(resultPost[0].comments[value]);

        var info = {
            layout: 'editCreate', 
            body: resultPost[0].comments[value].body
        }
        res.render("editComment", info);
    },

    postEditComment : async function (req, res){

        var id = req.params.id;
        console.log(id);

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        var value = req.params.value;

        var commentID = allPosts[id].comments[value]._id;

        if(req.body.post!==""){
            var success = await db.updateOne(Post, {"comments._id": commentID}, {
                $set: {
                    "comments.$.body": req.body.post,
                    "comments.$.edited": 1
                }
            });
            if( success ){
                console.log('comment sucessfully updated');
                res.redirect('/viewpost/' + id);
            }
            else{
                console.log('comment not updated');
                res.render("editComment", {layout: 'editCreate'});
            }
        } else {
            console.log("You did not comment anything");
            res.render("editComment", {layout: 'editCreate'});
        }
        
        
    }
};

module.exports = editCreateController;