const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const signupController = {

    getSignUp: async function (req, res) {
        res.render("signUp", {layout: 'signInReg'});
    },

    //signup controller
    postSignUp: async function (req, res) {
        const email = req.body.email;
        const name = req.body.username;
        const pass = req.body.password;
        const confirm = req.body.confirm;
        
        const hashedPassword = await bcrypt.hash(pass, 10);
        const hashedconPass = await bcrypt.hash(pass, 10);

        const user = {
            email: email,
            username: name,
            password: hashedPassword,
            confirm: hashedconPass, 
            comments: 0,
            upvotes: 0, 
    }

        try {
            const query = {username: name};
            const projection = {username:1};
            const result = await db.findOne(User,query,projection);

            if (result){
                // username already exists
                console.log("Username already exists");
                res.render('signUp', {layout: 'signInReg'});
            } else if (pass.length < 8){
                console.log("Your password needs at least 8 characters");
                res.render('signUp', {layout: 'signInReg'});
            } else if (pass !== confirm) {
                console.log("The passwords you have inputted do not match");
                res.render('signUp', {layout: 'signInReg'});
            } else {
                var success = await db.insertOne(User, user);
                if( success ){
                    console.log('User successfully added');
                    res.render('signIn', {layout: 'signInReg'});
                }
                else{
                    console.log('User not added');
                    res.render('signUp', {layout: 'signInReg'});
                }
            }
        } catch (err){
            res.status(500).send(err);
        }

    }

}

module.exports = signupController;