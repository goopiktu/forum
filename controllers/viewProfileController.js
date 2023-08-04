const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    

    getViewProfile: function (req, res){
        res.render("profile", {layout: 'profile'});
    },
    viewProfile: async function (req, res) {
        const query = {username: "gup"};
        const projection = 'username profpicture';
        const found = await db.findOne(user, {}, {});
        console.log("found");
        console.log(found);
        const user = {
            username: found.username,
            description: found.description,
            posts: found.posts,
            comments: found.comments,
            upvotes: found.upvotes,
            profpicture: found.profpicture,
            layout: 'profile'
        }
        console.log(user);
        res.render("profile", user);
    }
}

module.exports = viewProfileController;