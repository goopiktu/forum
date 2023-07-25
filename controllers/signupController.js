const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: function (req, res) {
        res.render("signUp", {layout: 'signInReg'});
    },

    postSignUp: async function (req, res) {
        const email = req.body.email;
        const name = req.body.username;
        const pass = req.body.password;
        const confirm = req.body.confirm;

        const user = {
            email: email,
            username: name,
            password: pass,
            confirm: confirm, 
            posts: 0, 
            comments: 0,
            upvotes: 0, 
            online: 0
        }

        try {
            const query = {username: name, password: pass};
            const projection = {username:1};
            const result = await db.findOne(User,query,projection);

            if (result){
                // username already exists
                alert("Username already exists");
                // res.redirect('/register');
            } else if (pass.length < 8){
                alert("Your password needs at least 8 characters");
            } else if (pass !== confirm) {
                alert("The passwords you have inputted do not match");
            } else {
                var success = await db.insertOne(User, user);
                if( success ){
                    console.log('User successfully added');
                    res.render('signIn', {layout: 'signInReg'});
                }
                else{
                    console.log('User not added');
                }
                // res.render('signIn', {isValid: true});
            }
        } catch (err){
            res.status(500).send(err);
        }
        
        var success = await db.insertOne(User, user);

    }

}

module.exports = signupController;