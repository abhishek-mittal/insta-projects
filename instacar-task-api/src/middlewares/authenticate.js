const passport = require('passport')
const jwt = require('jsonwebtoken');

function attemptLogin (req, res, next) {
    passport.authenticate("local", async (err, user, message) => {
      try {
        if (!user) throw new Error("Authentication failsed.");
        else {
          let payload = { id: user.id, email: user.email };
          let token = await jwt.sign(payload, 'secret', { expiresIn: 15000 });
          console.log(token);
          res.json({
            code: 200,
            status: true,
            data: user,
            token
          });
          // next();
        }
      } catch (error) {
        res.json({
          code: 401,
          status: false,
          error: message || err
        });
        // next(err);
      }
    })(req, res);
}

module.exports = {
    attemptLogin
}