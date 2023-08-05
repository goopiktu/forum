// import scemas
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const passport = require('passport');

const signinController = { 

    getSignIn : async function (req, res){
        const update = {
            $set: {
                online: 0 
              }
        }
        await db.updateOne(User,{}, update);

        res.render("signIn", {layout: 'signInReg'});
    },
   
    // dis part i am not rlly sure of ehe
    postSignIn: async function (req, res, next){
        passport.authenticate('local', {
            successRedirect: `/homepage?user=${req.body.username}`,
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    },

};

module.exports = signinController;


