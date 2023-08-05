const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy
function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {

        const user = getUserByEmail(email)
        console.log(user);
        if(user == null) {
            return done(null, false, {message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {

            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email'}, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}


module.exports = initialize;