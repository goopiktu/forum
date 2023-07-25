const db = require('../models/db.js');
// const post = require('../models/PostModel.js');
 
const homepageController = {
    guestView : function (req, res){
        var info = {
            posts: [
                {
                    title: "helow bost", 
                    username: "Current User", 
                    datePosted: new Date(),   
                    upvote: 2, 
                    downvote: 3
                }, 
                {
                    title: "U R GEI",
                    username: "Nerzik", 
                    datePosted: "July 12, 2003", 
                    upvote: 78, 
                    downvote: 3
                }, 
                {
                    title: "PeePEe POo Poo",
                    username: "Nerzik", 
                    datePosted: "July 12, 2003", 
                    upvote: 78, 
                    downvote: 3
                }
            ], 
            layout: 'homepage'
        }
        res.render("homepage", info);
    },
   
    // dis part i am not rlly sure of ehe
    userView : function (req, res){
        res.render("homepage", {layout: 'homepage'});
    },
};

module.exports = homepageController;