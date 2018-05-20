import {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} from '../secrets/facebook';
import UserService from "../users/users.service";
import LOGGER from "../utils/logger";

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

export default {
    registerStrategy: () => {
        LOGGER.info("Registering Facebook Strategy");
        passport.use(new FacebookStrategy({
                clientID: FACEBOOK_APP_ID,
                clientSecret: FACEBOOK_APP_SECRET,
                callbackURL: "http://www.example.com/auth/facebook/callback"
            },
            function (accessToken, refreshToken, profile, done) {
                LOGGER.debug("GetOrCreate Facebook user",accessToken, refreshToken, profile);
                const user = UserService.getUser(profile.login);
                if(!user){
                    UserService.createUser(profile);
                }
                done(null, user);
            }
        ));
    },
    registerService: (app) => {
        LOGGER.info("Registering Facebook Service");
        app.get('/auth/facebook', passport.authenticate('facebook'));
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { successRedirect: '/',
                failureRedirect: '/login' }));
    }
}
