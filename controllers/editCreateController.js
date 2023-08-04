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

        var resultPost;
        var ID;

        resultPost = await db.getLast(Post);
        if (resultPost[0]  === undefined){
            ID = 0;
        }else{
            ID = resultPost[0].postID + 1; 
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
            postID: ID,
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

        resultPost = await db.findMany(Post, {postID: id},{});
        console.log(resultPost);

        console.log(resultPost[0].body);

        var info = {
            layout: 'editCreate', 
            title: resultPost[0].title,
            body: resultPost[0].body
        }
        res.render("editPost", info);
    },
    postEditPost : async function (req, res){
 
        var resultPost;
        var id = req.params.id;
        console.log(id);

        resultPost = await db.findMany(Post, {postID: id},{});
        console.log(resultPost);

        var success = await db.updateOne(Post, {postID: id}, {
            title: req.body.title, 
            body: req.body.body
        });
        if( success ){
            console.log('post sucessfully updated');
            res.redirect('/viewpost/' + id);
        }
        else{
            console.log('comment not added');
            res.render("editComment", {layout: 'editCreate'});
        }

        console.log('pOst');
        res.render("editPost", {layout: 'editCreate'});
    },

    deletePost : function (req, res) {
        
    },

    getCreateComment: function (req, res){
        res.render("createComment", {layout: 'editCreate'});
    },
    postCreateComment : async function (req, res){

        currentUser = await db.findMany(User,{online: 1},{})

        if (currentUser.length === 0){
            console.log("guest cannot post");
        } else {
            console.log(currentUser);
            console.log("userView");
        }

        var resultPost;
        var id = req.params.id;
        console.log(id);

        resultPost = await db.findMany(Post, {postID: id},{});
        console.log(resultPost);

        const comment = {
            username: currentUser[0].username,
            datePosted: new Date(),
            body: req.body.post,
            edited: 0,
            upvote: 0,
            downvote: 0,
        }
        var success = await db.updateOne(Post, {postID: id}, {
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
            res.render("editComment", {layout: 'editCreate'});
        }
    },

    getEditComment : function (req, res){
        res.render("editComment", {layout: 'editCreate'});
    },

    postEditComment : function (req, res){
        res.render("editComment", {layout: 'editCreate'});
    }
};

module.exports = editCreateController;