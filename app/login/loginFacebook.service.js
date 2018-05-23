import LOGGER from "../utils/logger";
import UserService from "../users/users.service";

let FACEBOOK_APP_ID, FACEBOOK_APP_SECRET;
try {
    FACEBOOK_APP_ID = require('../secrets/facebook').FACEBOOK_APP_ID;
    FACEBOOK_APP_SECRET = require('../secrets/facebook').FACEBOOK_APP_SECRET;
    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
        throw "error loading facebook data";
    }
} catch (e) {
    LOGGER.warn("Clefs facebook introuvable, désactivation du endpoint facebook...");
}

let httpsProxy;
try {
    httpsProxy = require('../proxy').httpProxy;
} catch (e) {
    LOGGER.warn("No proxy loaded");
}

const passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

export default {
    registerStrategy: () => {
        if (FACEBOOK_APP_ID && FACEBOOK_APP_SECRET) {
            LOGGER.info("Registering Facebook Strategy");
            let facebookStrategy = new FacebookStrategy({
                    clientID: FACEBOOK_APP_ID,
                    clientSecret: FACEBOOK_APP_SECRET,
                    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
                    profileFields: ['id', 'displayName', 'email']
                },
                function (accessToken, refreshToken, profile, done) {
                    LOGGER.debug("GetOrCreate Facebook user", profile.displayName);
                    const user = UserService.getUser(profile.id);
                    if (!user) {
                        UserService.createUser(profile);
                    }
                    done(null, user);
                }
            );
            if (httpsProxy) {
                facebookStrategy._oauth2.setAgent(httpsProxy);
            }
            passport.use(facebookStrategy);
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
