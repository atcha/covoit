import LOGGER from "../utils/logger";
import UserService from "../users/users.service";

let GOOGLE_APP_ID, GOOGLE_APP_SECRET;
try {
    GOOGLE_APP_ID = require('../secrets/google').GOOGLE_APP_ID;
    GOOGLE_APP_SECRET = require('../secrets/google').GOOGLE_APP_SECRET;
    if (!GOOGLE_APP_ID || !GOOGLE_APP_SECRET) {
        throw "error loading google's data";
    }
} catch (e) {
    LOGGER.warn("Clefs google introuvable, désactivation du endpoint google...");
}

let httpsProxy;
try {
    httpsProxy = require('../proxy').httpProxy;
} catch (e) {
    LOGGER.warn("No proxy loaded");
}

const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

export default {
    registerStrategy: () => {
        if (GOOGLE_APP_ID && GOOGLE_APP_SECRET) {
            LOGGER.info("Registering Facebook Strategy");
            passport.use(new GoogleStrategy({
                    clientID: GOOGLE_APP_ID,
                    clientSecret: GOOGLE_APP_SECRET,
                    callbackURL: "http://localhost:8080/api/auth/google/callback"
                },
                function (accessToken, refreshToken, profile, cb) {
                    LOGGER.debug("GetOrCreate Google user", profile, cb);
                    const user = UserService.getUser(profile.id);
                    if (!user) {
                        UserService.createUser(profile);
                    }
                }
            ));
            if (httpsProxy) {
                GoogleStrategy._oauth2.setAgent(httpsProxy);
            }
            passport.use(GoogleStrategy);
        }
    },
    registerService: (app) => {
        if (GOOGLE_APP_ID && GOOGLE_APP_SECRET) {
            LOGGER.info("Registering Google Service");
            app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}));
            app.get('/auth/google/callback',
                passport.authenticate('google', {failureRedirect: '/login'}),
                function (req, res) {
                    // Successful authentication, redirect home.
                    res.redirect('/');
                }
            );
        }
    }
}
