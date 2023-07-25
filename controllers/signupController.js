const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const signupController = {

    getSignUp: async function (req, res) {
        
        const update = {
            $set: {
                online: 0 
              }
        }
        await db.updateOne(User,{}, update);

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
                // res.render('signIn', {isValid: true});
            }
        } catch (err){
            res.status(500).send(err);
        }
        
        // var success = await db.insertOne(User, user);

    }

}

module.exports = signupController;