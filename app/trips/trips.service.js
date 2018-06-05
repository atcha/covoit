import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import {authenticated} from "../utils/SecurityUtils";

export default class TripsService {

    constructor(app) {
        LOGGER.info("registering trips service");

        app.get('/trips/users/current', this.getTripOfCurrentUser.bind(this));
        app.get('/trips/:id', this.getTripById.bind(this));
        app.get('/trips', this.getAllTrips.bind(this));
        app.post('/trips', this.createTrip.bind(this));
        app.put('/trips', this.updateTrip.bind(this));
    }

    getByUserIdFromDb(id) {
        return DeployDB.getTrips().data.find((trip) => trip.userId === id);
    }

    getTripFromDb(id) {
        return DeployDB.getTrips().data.find((trip) => trip.$loki === id);
    }

    createTripToDb(trip) {
        DeployDB.save(DeployDB.getTrips(), trip);
    }

    @authenticated
    getTripOfCurrentUser(req, res) {
        LOGGER.debug(`GET /users`);
        res.send(this.getByUserIdFromDb(req.user.id));
    }

    @authenticated
    getTripById(req, res) {
        LOGGER.debug(`GET /trips/${req.params.id}`);
        const requestedTrip = this.getTripFromDb(req.params.id);
        if (requestedTrip) {
            res.send(requestedTrip);
        } else {
            res.sendStatus(204);
        }
    }

    @authenticated
    getAllTrips(req, res) {
        LOGGER.debug(`GET /trips`);
        res.send(DeployDB.getTrips().data);
    }

    @authenticated
    createTrip(req, res) {
        LOGGER.debug(`POST /trips`, req.body, '<-');
        this.createTripToDb(req.body);
        res.send(req.body);
    }

    @authenticated
    updateTrip(req, res) {
        LOGGER.debug(`PUT /trips`, req.body);

        if (!DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki)) {
            res.send(`id trip : ${req.body.$loki} introuvable.`, 400);
        } else {
            DeployDB.save(DeployDB.getTrips(), req.body);
            res.send(DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki));
        }
    }
}
