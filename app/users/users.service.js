import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import SecurityUtils from "../utils/SecurityUtils";

export default class UsersService {

    constructor(app) {
        LOGGER.info("registering users service");

        app.get('/users/current', this.getCurrentUser);
        app.get('/users/:id', this.getUserById);
        app.get('/users', this.getAllUsers);
        app.post('/users', this.createUser);
        app.put('/users', this.editUser);

    }

    getCurrentUser(req, res) {
        LOGGER.debug(`GET /users`);
        SecurityUtils.authenticatedFilter(req, res);
        res.send(req.user);
    }


    getUserById(req, res) {
        LOGGER.debug(`GET /users/${req.params.id}`);
        SecurityUtils.authenticatedFilter(req, res);

        let requestedUser = this.getUserFromDb(req.params.id);
        if (requestedUser) {
            res.send(requestedUser);
        } else {
            res.sendStatus(204);
        }
    }


    getAllUsers(req, res) {
        LOGGER.debug(`GET /users`);
        SecurityUtils.authenticatedFilter(req, res);

        res.send(DeployDB.getUsers().data);
    }


    createUser(req, res) {
        LOGGER.debug(`POST /users`, req.body, '<-');
        SecurityUtils.authenticatedFilter(req, res);

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


    editUser(req, res) {
        LOGGER.debug(`PUT /users`);
        SecurityUtils.authenticatedFilter(req, res);

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