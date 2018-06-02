import LOGGER from '../utils/logger';
import DeployDB from "../utils/DeployDB";

export default {
    getUser: function (id) {
        return DeployDB.getUsers().data.find((user) => user.id === id);
    },
    createUser: function (user) {
        DeployDB.save(DeployDB.getUsers(), user);
    },
    registerService: (app) => {
        LOGGER.info("registering users service");

        app.get('/users/current', (req, res) => {
            LOGGER.debug(`GET /users`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }
            res.send(req.user);
        });

        app.get('/users/:id', (req, res) => {
            LOGGER.debug(`GET /users/${req.params.id}`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            let requestedUser = this.getUser(req.params.id);
            if (requestedUser) {
                res.send(requestedUser);
            } else {
                res.sendStatus(204);
            }
        });

        app.get('/users', (req, res) => {
            LOGGER.debug(`GET /users`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            res.send(DeployDB.getUsers().data);
        });


        app.post('/users', (req, res) => {
            LOGGER.debug(`POST /users`, req.body, '<-');
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            if (!req.body.id) {
                res.send('Il faut au minimum un id pour enregistrer un utilisateur');
            } else {
                if (!DeployDB.getUsers().data.find((user) => user.id === req.body.id)) {
                    this.createUser(req.body);
                    res.send(DeployDB.getUsers().data.find((user) => user.id === req.body.id));
                } else {
                    res.send(`id ${req.body.id} déjà utilisé.`, 400);
                }
            }
        });

        app.put('/users', (req, res) => {
            LOGGER.debug(`PUT /users`, req.body);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }

            if (!DeployDB.getUsers().data.find((user) => user.id === req.body.id)) {
                res.send(`id ${req.body.id} introuvable.`, 400);
            } else {
                DeployDB.save(DeployDB.getUsers(), req.body);
                res.send(DeployDB.getUsers().data.find((user) => user.id === req.body.id));
            }
        });

    }
};