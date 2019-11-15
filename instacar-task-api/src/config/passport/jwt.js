const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (config) => {
    const JWT_OPTIONS = {
        secretOrKey: config.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT")
    }

    const JWT_AUTH = async (payload, done) => {
        try {
            const user = await User.findById(payload.id);
            if (!user) {
                throw new Error("Please login/signup first");
            }
            done(null, user);
        } catch (error) {
            done(error);
        }
    }

    return new JWTStrategy(JWT_OPTIONS, JWT_AUTH);
}