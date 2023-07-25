const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const signinController = require('../controllers/signinController');
 
const homepageController = {
    view : async function (req, res){

        var allPosts;
        try{
            allPosts = await db.findMany(Post,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        if (signinController.currentUser === 'guest'){
            var info = {
                user: 0, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("guestView");
        } else {
            var info = {
                user: signinController.currentUser, 
                posts: allPosts, 
                layout: 'home'
            }
            console.log("userView");
        }
        res.render("homepage", info);
    }
};

module.exports = homepageController;