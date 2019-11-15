module.exports = (passport, config) => {
    passport.use("jwt", require('./jwt')(config));
    passport.use("local", require('./local')());
};
