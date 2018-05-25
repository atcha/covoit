import LOGGER from '../utils/logger';

export default {
    registerService: (app) => {
        LOGGER.info("registering login service");
        app.get('/logged-in', (req, res) => {
            LOGGER.debug(`/logged-in`,req.user);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }else{
                res.status(200).send(true);
            }
        });

    }
};