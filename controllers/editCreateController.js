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
    editPost : function (req, res){
        res.render("editPost", {layout: 'editCreate'});
    },

    deletePost : function (req, res) {
        
    },



    createComment : function (req, res){
        res.render("createComment", {layout: 'editCreate'});
    },

    editComment : function (req, res){
        res.render("editComment", {layout: 'editCreate'});
    },





};

module.exports = editCreateController;