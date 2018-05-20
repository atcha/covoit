import LOGGER from "../utils/logger";

let FACEBOOK_APP_ID, FACEBOOK_APP_SECRET;
try {
    FACEBOOK_APP_ID = require('../secrets/facebook').FACEBOOK_APP_ID;
    FACEBOOK_APP_SECRET = require('../secrets/facebook').FACEBOOK_APP_SECRET;
} catch (e) {
    LOGGER.warn("Clefs facebook introuvable, désactivation du endpoint facebook...");
}

import UserService from "../users/users.service";

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

export default {
    registerStrategy: () => {
        if (FACEBOOK_APP_ID && FACEBOOK_APP_SECRET) {
            LOGGER.info("Registering Facebook Strategy");
            passport.use(new FacebookStrategy({
                    clientID: FACEBOOK_APP_ID,
                    clientSecret: FACEBOOK_APP_SECRET,
                    callbackURL: "http://www.example.com/auth/facebook/callback"
                },
                function (accessToken, refreshToken, profile, done) {
                    LOGGER.debug("GetOrCreate Facebook user", accessToken, refreshToken, profile);
                    const user = UserService.getUser(profile.login);
                    if (!user) {
                        UserService.createUser(profile);
                    }
                    done(null, user);
                }
            ));
        }
    },
    registerService: (app) => {
        if (FACEBOOK_APP_ID && FACEBOOK_APP_SECRET) {
            LOGGER.info("Registering Facebook Service");
            app.get('/auth/facebook', passport.authenticate('facebook'));
            app.get('/auth/facebook/callback',
                passport.authenticate('facebook', {
                    successRedirect: '/',
                    failureRedirect: '/login'
                }));
        }
    }
}
