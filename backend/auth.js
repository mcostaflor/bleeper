// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var users = require("./models/usuario");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
    var strategy = new Strategy(params, function (payload, done) {

        users.findById(payload._id, (error, usuario) => {

            if (error) {
                throw error;
            }
            
            if (usuario) {
                return done(null, { payload });
            } else {
                return done(new Error("User not found"), null);
            }
        });
    })
    passport.use(strategy);

    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };


}