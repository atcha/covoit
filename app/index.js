import LOGGER from './utils/logger';
import GeocodingService from './geocoding/geocoding.service';
import UsersService from './users/users.service';
import TripsService from './trips/trips.service';
import LoginFacebookService from './login/loginFacebook.service';
import LoginGoogleService from './login/loginGoogle.service';
import LoginLdapService from './login/loginLdap.service';
import Login from './login/login.service';
import DeployDb from './utils/DeployDB';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import http from 'http';
import CovoitWebSocket from "./webSocket/CovoitWebSocket";

LOGGER.info("Starting server...");

// server
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

app.use(bodyParser.json()); // for parsing application/json

const passport = require('passport');
let expressSession = require('express-session');

app.use(expressSession({
    secret: 'cookie_secret',
    name: 'covoit_cookie',
    proxy: true,
    resave: true,
    cookie: {httpOnly: false},
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


DeployDb.init().then(() => {
    LOGGER.info("db initialized");

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (userId, done) {
        LOGGER.debug("deserializeUser", userId);
        done(null, UsersService.getUserFromDb(userId));
    });


    GeocodingService.registerService(app);
    new UsersService(app);
    new TripsService(app);
    LoginFacebookService.registerService(app);
    LoginFacebookService.registerStrategy();
    LoginGoogleService.registerService(app);
    LoginGoogleService.registerStrategy();
    LoginLdapService.registerService(app);
    LoginLdapService.registerStrategy();
    Login.registerService(app);
    new CovoitWebSocket(wsServer);
});


server.listen(port, function () {
    LOGGER.info(`Server started and listening on port ${port}!`);
});