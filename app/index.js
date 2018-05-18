import LOGGER from './utils/logger';
import GeocodingService from './geocoding/geocoding.service';
import DeployDb from './utils/DeployDB';

LOGGER.info("Starting server...");

// server
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;


DeployDb.init().then(() => {
    LOGGER.info("db initialized");
    GeocodingService.registerService(app);
});


app.listen(port, function () {
    LOGGER.info(`Server started and listening on port ${port}!`);
});