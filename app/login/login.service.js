import LOGGER from '../utils/logger';

export default {
    registerService: (app) => {
        LOGGER.info("registering login service");
        app.get('/logged-in', (req, res) => {
            LOGGER.debug(`/logged-in`);
            if(!req.user){
                res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
                return;
            }else{
                res.status(200).send(true);
            }
        });

        app.get('/logout', function(req, res){
            LOGGER.debug(`/logout`);
            req.logout();
            res.redirect('/');
        });
    }
};