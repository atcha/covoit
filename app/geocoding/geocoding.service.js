import LOGGER from '../utils/logger';
import {logCalls} from "../utils/loggerUtils";
import {authenticated} from "../utils/SecurityUtils";
// server

let httpProxy;
try {
    httpProxy = require('../proxy').httpProxy;
} catch (e) {
    LOGGER.warn("No proxy loaded");
}

const fetch = require("node-fetch"),
    urlencode = require("urlencode"),
    API_URL = "https://api-adresse.data.gouv.fr";


export default class GeocodingService {
    constructor(app) {
        LOGGER.info("registering geocoding service");

        app.get('/geocode/address/:address', this.findAdress.bind(this));
    }

    query(q) {
        const agentProxy = httpProxy || "";
        return fetch(`${API_URL}/search/?q=${urlencode(q)}`, {agent: agentProxy}).then(x => x.json());
    }


    @authenticated
    @logCalls
    findAdress(req, res) {
        this.query(req.params.address).then(json => res.send(json.features));
    }
}