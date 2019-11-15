const passport = require("passport");

module.exports = (req, res, next) => {
    console.log('check if the user is authenticated.')

    passport.authenticate("jwt", (err, user) => {
        try {

            if(!user) {
                throw new Error("INVALID_ATTEMPT");
            }

            req.user = user;
            console.log('user authenticated.');
            next();
            
        } catch (error) {
            next(error);
        }
    })(req, res);
};