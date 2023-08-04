// import scemas
const db = require('../models/db.js');
const User = require('../models/UserModel.js');


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
    postSignIn: async function (req, res){
        const name = req.body.username;
        const pass = req.body.password;

        try{
            allUser = await db.findMany(User,{},{});
        } catch (err){
            res.status(500).send(err);
        }

        for (let i = 0; i < allUser.length; i++) {
            allUser[i].online = 0;
        } 

        try{
            const query = {username: name, password: pass};
            const projection = {username:1};
            const result = await db.findOne(User,query,projection);

            if (result){
                const update = {
                    $set: {
                        online: 1  
                      }
                }
                await db.updateOne(User,query, update);
                res.redirect('/homepage?user=' + name);
            } else { 
                res.render('signIn', {layout: 'signInReg'});
            }
        } catch (err){
            res.status(500).send(err);
        }
    },

};

module.exports = signinController;


