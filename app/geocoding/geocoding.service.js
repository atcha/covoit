import LOGGER from '../utils/logger';
// server

let httpProxy;
try {
    httpProxy = require('../proxy').httpProxy;
}catch(e){
    LOGGER.warn("No proxy loaded");
}

const fetch = require("node-fetch"),
    urlencode = require("urlencode"),
    API_URL = "https://api-adresse.data.gouv.fr";


export default {
    registerService: (app) => {
        LOGGER.info("registering geocoding service");
        const query = q => {
            const agentProxy = httpProxy || "";
            return fetch(`${API_URL}/search/?q=${urlencode(q)}`, {agent: agentProxy}).then(x => x.json());
        };

        app.get('/geocode/address/:address', (req, res) => {
            LOGGER.debug(`/geocode/address/${req.params.address}`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }
            query(req.params.address).then(json => res.send(json.features));
        });

    }
};