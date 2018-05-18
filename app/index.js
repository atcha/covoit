import LOGGER from './utils/logger';
import GeocodingService from './geocoding/geocoding.service';
import UsersService from './users/users.service';
import DeployDb from './utils/DeployDB';
import bodyParser from 'body-parser';

LOGGER.info("Starting server...");

// server
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json


DeployDb.init().then(() => {
    LOGGER.info("db initialized");
    GeocodingService.registerService(app);
    UsersService.registerService(app);
});


app.listen(port, function () {
    LOGGER.info(`Server started and listening on port ${port}!`);
});