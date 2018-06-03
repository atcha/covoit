export default class SecurityUtils {

    static authenticatedFilter(req,res){
        if (!req.user) {
            res.status(401).send("Il faut être connecté pour utiliser cette fonctionnalitée");
        }
    }

}