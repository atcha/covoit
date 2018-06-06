import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import {authenticated} from "../utils/SecurityUtils";
import {logCalls} from "../utils/loggerUtils";

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
    @logCalls
    getTripOfCurrentUser(req, res) {
        res.send(this.getByUserIdFromDb(req.user.id));
    }

    @authenticated
    @logCalls
    getTripById(req, res) {
        const requestedTrip = this.getTripFromDb(req.params.id);
        if (requestedTrip) {
            res.send(requestedTrip);
        } else {
            res.sendStatus(204);
        }
    }

    @authenticated
    @logCalls
    getAllTrips(req, res) {
        res.send(DeployDB.getTrips().data);
    }

    @authenticated
    @logCalls
    createTrip(req, res) {
        this.createTripToDb(req.body);
        res.send(req.body);
    }

    @authenticated
    @logCalls
    updateTrip(req, res) {
        if (!DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki)) {
            res.send(`id trip : ${req.body.$loki} introuvable.`, 400);
        } else {
            DeployDB.save(DeployDB.getTrips(), req.body);
            res.send(DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki));
        }
    }
}
