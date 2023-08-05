const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    

    getViewProfile: function (req, res){
        res.render("profile", {layout: 'profile'});
    },
    viewProfile: async function (req, res) {
        // console.log("??");
        const query = {username: "gup"};
        const projection = {username:1};
        const result = await db.findOne(User,query,projection);
        console.log(result);
    
        const user = {
            username: result.username,
            description: result.description,
            posts: result.posts,
            comments: result.comments,
            upvotes: result.upvotes,
            profpicture: result.profpicture,
            layout: 'profile'
        }
        console.log(user);
        res.render("profile", user);
    }
}

module.exports = viewProfileController;