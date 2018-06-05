import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";
import SecurityUtils, {authenticated} from "../utils/SecurityUtils";

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
    getCurrentUser(req, res) {
        LOGGER.debug(`GET /users/current`);
        res.send(req.user);
    }

    @authenticated
    getUserById(req, res) {
        LOGGER.debug(`GET /users/${req.params.id}`);
        let requestedUser = this.getUserFromDb(req.params.id);
        if (requestedUser) {
            res.send(requestedUser);
        } else {
            res.sendStatus(204);
        }
    }

    @authenticated
    getAllUsers(req, res) {
        LOGGER.debug(`GET /users`);
        res.send(DeployDB.getUsers().data);
    }

    @authenticated
    createUser(req, res) {
        LOGGER.debug(`POST /users`, req.body, '<-');
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
    editUser(req, res) {
        LOGGER.debug(`PUT /users`);
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