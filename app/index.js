// server
import { httpProxy } from './proxy';
const express = require('express'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 3000,
    fetch = require("node-fetch"),
    urlencode = require("urlencode"),
    API_URL = "https://api-adresse.data.gouv.fr";



const query = q => {
    const agentProxy = httpProxy || "";
    return fetch(`${API_URL}/search/?q=${urlencode(q)}`, { agent: agentProxy }).then(x => x.json());
};

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/geocode/address/:address', (req, res ) => {
    query(req.params.address).then(json => res.send(json.features));
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});