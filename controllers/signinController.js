// import scemas
const db = require('../models/db.js');
const User = require('../models/UserModel.js');
 
var currentUser = 'guest'; 
const signinCon = {
    getSignIn : function (req, res){
        res.render("signIn", {layout: 'signInReg'});
    },
   
    // dis part i am not rlly sure of ehe
    postSignIn: async function (req, res){
        const name = req.body.username;
        const pass = req.body.password;

        try{
            const query = {username: name, password: pass};
            const projection = {username:1};
            const result = await db.findOne(User,query,projection);

            if (result){
                currentUser = result.username;
                console.log(curentUser);
                res.redirect('homepage');
            } else { 
                res.render('signIn', {layout: 'signInReg'});
            }
        } catch (err){
            res.status(500).send(err);
        }
    }
};

module.exports.signinController = signinCon;
module.exports.currentUser = currentUser;

