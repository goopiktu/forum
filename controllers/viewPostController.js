const db = require('../models/db.js');
const User = require('../models/UserModel.js');
 
const viewPostController = {
    viewPost : function (req, res){
        var info = {
            username: "i hate life", 
            title: "Goblin",
            datePosted: "June 20, 2023",
            body:"This part here can ow HTML tags",
            edited:"(edited)", 
            upvote: 3, 
            downvote: 35, 
            comments: [
                {
                    username: "pootTroot", 
                    datePosted: "Date", 
                    body: "my PrEciOussss", 
                    edited: Number, 
                    upvote: 0, 
                    downvote: 0
                }, 
                {
                    username: "odercomment", 
                    datePosted: "July 14, 2023", 
                    body: "my PrEciOussss", 
                    edited: 1, 
                    upvote: 7, 
                    downvote: 0
                }
            ], 
            layout: 'homepage'
        }
        res.render("viewPosts", info);
    },
};

module.exports = viewPostController;