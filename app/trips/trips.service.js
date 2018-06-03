import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import SecurityUtils from "../utils/SecurityUtils";

export default class TripsService {

    constructor(app) {
        LOGGER.info("registering trips service");

        app.get('/trips/users/current', this.getTripOfCurrentUser);
        app.get('/trips/:id', this.getTripById);
        app.get('/trips', this.getAllTrips);
        app.post('/trips', this.createTrip);
        app.put('/trips', this.updateTrip);
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

    getTripOfCurrentUser(req, res) {
        LOGGER.debug(`GET /users`);
        SecurityUtils.authenticatedFilter(req,res);
        res.send(this.getByUserIdFromDb(req.user.id));
    }

    getTripById(req, res) {
        LOGGER.debug(`GET /trips/${req.params.id}`);
        SecurityUtils.authenticatedFilter(req,res);
        const requestedTrip = this.getTripFromDb(req.params.id);
        if (requestedTrip) {
            res.send(requestedTrip);
        } else {
            res.sendStatus(204);
        }
    }

    getAllTrips(req, res) {
        LOGGER.debug(`GET /trips`);
        SecurityUtils.authenticatedFilter(req,res);

        res.send(DeployDB.getTrips().data);
    }

    createTrip(req, res) {
        LOGGER.debug(`POST /trips`, req.body, '<-');
        SecurityUtils.authenticatedFilter(req,res);

        this.createTripToDb(req.body);
        res.send(req.body);
    }

    updateTrip(req, res) {
        LOGGER.debug(`PUT /trips`, req.body);
        SecurityUtils.authenticatedFilter(req,res);

        if (!DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki)) {
            res.send(`id trip : ${req.body.$loki} introuvable.`, 400);
        } else {
            DeployDB.save(DeployDB.getTrips(), req.body);
            res.send(DeployDB.getTrips().data.find((trip) => trip.$loki === req.body.$loki));
        }
    }
}
