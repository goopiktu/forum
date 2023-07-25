const db = require('../models/db.js');
// const post = require('../models/PostModel.js');
 
const homepageController = {
    guestView : async function (req, res){

        const allPosts = [];
        try{
            allPosts = await db.findMany(User,null,null);
            console.log(allPosts);
        } catch (err){
            res.status(500).send(err);
        }

        var info = {
            posts: allPosts, 
            layout: 'home'
        }
        res.render("homepage", info);
    },
   
    // dis part i am not rlly sure of ehe
    userView : function (req, res){
        res.render("homepage", {layout: 'home'});
    },
};

module.exports = homepageController;