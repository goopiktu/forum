//passport-config.js
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        try {
            
            const user = await getUserByUsername(username);

            if (!user) {
                return done(null, false, { message: 'No user with that username' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log(passwordMatch)
            if (passwordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));

    passport.serializeUser((user, done) => {
        // Serialize the user's ID for the session
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = initialize;
