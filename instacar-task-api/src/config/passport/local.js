const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
    const LOCAL_OPTS = {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }

    const LOCAL_AUTH = async (req, userEmail, password, done) => {
        if(!password && !userEmail) {
            done(null, false, {message: 'please enter all details.'});
        }

        const user = await User.findOne({email: userEmail});
        if(!user) {
            return done(null, false, {message: 'USER_NOT_FOUND'});
        }

        if(!(user.password === password)) {
            return done(null, false, {nessage: 'PASSWORD_WRONG'});
        }

        return done(null, user);
    }

    return new LocalStrategy(LOCAL_OPTS, LOCAL_AUTH);
}