const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render('SignUp',res);
    },

    postSignUp: async function (req, res) {
        const user = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            confirm: req.body.confirm,
        }

        var success = await db.insertOne(User, user);

        if( success ){
            console.log('User successfully added');
            res.render('signIn', {isRegistered: true});
        }
        else{
            console.log('User not added');
        }
    }

}

module.exports = signupController;