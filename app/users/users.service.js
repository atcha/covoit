import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";

export default {
    getUser: function (login) {
        return DeployDB.getUsers().data.find((user) => user.login === login);
    },
    createUser: function (user) {
        DeployDB.save(DeployDB.getUsers(), user);
    },
    registerService: (app) => {
        LOGGER.info("registering users service");
        app.get('/users/:login', (req, res) => {
            LOGGER.debug(`GET /users/${req.params.login}`);
            let requestedUser = this.getUser(req.params.login);
            if (requestedUser) {
                res.send(requestedUser);
            } else {
                res.sendStatus(204);
            }
        });

        app.get('/users', (req, res) => {
            LOGGER.debug(`GET /users`);
            res.send(DeployDB.getUsers().data);
        });

        app.post('/users', (req, res) => {
            LOGGER.debug(`POST /users`, req.body, '<-');
            if (!req.body.login) {
                res.send('Il faut au minimum un login pour enregistrer un utilisateur');
            } else {
                if (!DeployDB.getUsers().data.find((user) => user.login === req.body.login)) {
                    this.createUser(req.body);
                    res.send(DeployDB.getUsers().data.find((user) => user.login === req.params.login));
                } else {
                    res.send(`Login ${req.body.login} déjà utilisé.`, 400);
                }
            }
        });

        app.put('/users', (req, res) => {
            LOGGER.debug(`PUT /users`, req.body);
            if (!DeployDB.getUsers().data.find((user) => user.login === req.body.login)) {
                res.send(`Login ${req.body.login} introuvable.`, 400);
            } else {
                DeployDB.save(DeployDB.getUsers(), req.body);
                res.send(DeployDB.getUsers().data.find((user) => user.login === req.params.login));
            }
        });

    }
};