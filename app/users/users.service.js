import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import {authenticated} from "../utils/SecurityUtils";
import {logCalls} from "../utils/loggerUtils";

export default class UsersService {

    constructor(app) {
        LOGGER.info("registering users service");

        app.get('/users/current', this.getCurrentUser.bind(this));
        app.get('/users/:id', this.getUserById.bind(this));
        app.get('/users', this.getAllUsers.bind(this));
        app.post('/users', this.createUser.bind(this));
        app.put('/users', this.editUser.bind(this));

    }

    @authenticated
    @logCalls
    getCurrentUser(req, res) {
        res.send(req.user);
    }

    @authenticated
    @logCalls
    getUserById(req, res) {
        let requestedUser = this.getUserFromDb(req.params.id);
        if (requestedUser) {
            res.send(requestedUser);
        } else {
            res.sendStatus(204);
        }
    }

    @authenticated
    @logCalls
    getAllUsers(req, res) {
        res.send(DeployDB.getUsers().data);
    }

    @authenticated
    @logCalls
    createUser(req, res) {
        if (!req.body.id) {
            res.send('Il faut au minimum un id pour enregistrer un utilisateur');
        } else {
            if (!DeployDB.getUsers().data.find((user) => user.id === req.body.id)) {
                this.createUserIntoDb(req.body);
                res.send(DeployDB.getUsers().data.find((user) => user.id === req.body.id));
            } else {
                res.send(`id ${req.body.id} déjà utilisé.`, 400);
            }
        }
    }

    @authenticated
    @logCalls
    editUser(req, res) {
        if (!DeployDB.getUsers().data.find((user) => user.id === req.body.id)) {
            res.send(`id ${req.body.id} introuvable.`, 400);
        } else {
            DeployDB.save(DeployDB.getUsers(), req.body);
            res.send(DeployDB.getUsers().data.find((user) => user.id === req.body.id));
        }
    }


    static getUserFromDb(id) {
        return DeployDB.getUsers().data.find((user) => user.id === id);
    }

    static createUserIntoDb(user) {
        DeployDB.save(DeployDB.getUsers(), user);
    }
}