import LOGGER from './utils/logger';
import GeocodingService from './geocoding/geocoding.service';
import UsersService from './users/users.service';
import LoginFacebookService from './login/loginFacebook.service';
import LoginGoogleService from './login/loginGoogle.service';
import Login from './login/login.service';
import DeployDb from './utils/DeployDB';
import bodyParser from 'body-parser';

LOGGER.info("Starting server...");

// server
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json

const passport = require('passport');
let expressSession = require('express-session');

app.use(expressSession({
    secret: 'cookie_secret',
    name: 'covoit_cookie',
    proxy: true,
    resave: true,
    cookie: { httpOnly: false },
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


DeployDb.init().then(() => {
    LOGGER.info("db initialized");

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(userId, done) {
        LOGGER.debug("deserializeUser",userId);
        done(null, UsersService.getUser(userId));
    });


    GeocodingService.registerService(app);
    UsersService.registerService(app);
    LoginFacebookService.registerService(app);
    LoginFacebookService.registerStrategy();
    LoginGoogleService.registerService(app);
    LoginGoogleService.registerStrategy();
    Login.registerService(app);
});



app.listen(port, function () {
    LOGGER.info(`Server started and listening on port ${port}!`);
});