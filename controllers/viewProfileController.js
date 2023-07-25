const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const viewProfileController = {
    viewProfile: async function (req, res) {


        
        const query = {username: req.query.username};
        const projection = 'username profpicture';
        const found = await db.findOne(User, query, projection);

        const user = {
            username: found.username,
            description: found.description,
            posts: found.posts,
            comments: found.comments,
            upvotes: found.upvotes,
            profpicture: found.profpicture
        }
        res.render('profile', user);
    }
}

module.exports = viewProfileController;