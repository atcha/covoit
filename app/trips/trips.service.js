import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";

export default {
    getByUserId: function (id) {
        return DeployDB.getTrips().data.find((trip) => trip.userId === id);
    },
    getTrip: function (id) {
        return DeployDB.getTrips().data.find((trip) => trip.$loki === id);
    },
    createTrip: function (trip) {
        DeployDB.save(DeployDB.getTrips(), trip);
    },
    registerService: (app) => {
        LOGGER.info("registering trips service");

        app.get('/trips/users/current', (req, res) => {
            LOGGER.debug(`GET /users`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }
            res.send(this.getByUserId(req.user.id));
        });

        app.get('/trips/:id', (req, res) => {
            LOGGER.debug(`GET /trips/${req.params.id}`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            let requestedTrip = this.getTrip(req.params.id);
            if (requestedTrip) {
                res.send(requestedTrip);
            } else {
                res.sendStatus(204);
            }
        });

        app.get('/trips', (req, res) => {
            LOGGER.debug(`GET /trips`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            res.send(DeployDB.getTrips().data);
        });


        app.post('/trips', (req, res) => {
            LOGGER.debug(`POST /trips`, req.body, '<-');
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            this.createTrip(req.body);
            res.send(req.body);
        });

        app.put('/trips', (req, res) => {
            LOGGER.debug(`PUT /trips`, req.body);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            if (!DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki)) {
                res.send(`id trip : ${req.body.$loki} introuvable.`, 400);
            } else {
                DeployDB.save(DeployDB.getTrips(), req.body);
                res.send(DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki));
            }
        });

    }
};