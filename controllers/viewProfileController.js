const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    viewProfile: async function (req, res) {

        var currentUser = await db.findOne(User,{_id: req.user.id},{})

        const user = {
            username: currentUser.username,
            description: currentUser.description,
            posts: currentUser.posts,
            comments: currentUser.comments,
            upvotes: currentUser.upvotes,
            profpicture: currentUser.profpicture, 
            layout: 'viewprofile'
        }
        res.render('profile', user);
    }
}

module.exports = viewProfileController;