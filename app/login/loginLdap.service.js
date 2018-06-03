import LOGGER from "../utils/logger";
import UserService from "../users/users.service";


let LDAP_URL, LDAP_DOMAIN;
try {
    LDAP_URL = require('../secrets/ldap').LDAP_URL;
    LDAP_DOMAIN = require('../secrets/ldap').LDAP_DOMAIN;
    if (!LDAP_URL || !LDAP_DOMAIN) {
        throw "error loading LDAP's data";
    }
} catch (e) {
    LOGGER.warn("Parametres LDAP introuvable, désactivation du endpoint LDAP...");
}

let httpsProxy;
try {
    httpsProxy = require('../proxy').httpProxy;
} catch (e) {
    LOGGER.warn("No proxy loaded");
}

const passport = require('passport'),
    LdapStrategy = require('passport-ldapauth').Strategy;

const getLDAPConfiguration = function (req, callback) {
    // Fetching things from database or whatever
    process.nextTick(function () {
        LOGGER.debug('LDAP auth : ', req.body.login);
        try {
            callback(null, {
                server: {
                    url: LDAP_URL,
                    bindDN: req.body.login+'@'+LDAP_DOMAIN,
                    bindCredentials: req.body.password,
                    searchFilter: '(uid={{login}})',
                    searchBase: 'ou=root'
                },
                usernameField: 'login',
                passwordField: 'password'
            });
        }catch(e){
            LOGGER.error(e);
            return true;
        }
    });
};

export default {
    registerStrategy: () => {
        if (LDAP_URL && LDAP_DOMAIN) {
            LOGGER.info("Registering LDAP Strategy");
            let ldapStrategy = new LdapStrategy(getLDAPConfiguration,
                function (user, done) {
                }
            );
            passport.use(ldapStrategy);
        }
    },
    registerService: (app) => {
        if (LDAP_URL) {
            LOGGER.info("Registering LDAP Service");
            app.post('/login', function(req,res){
                passport.authenticate('ldapauth', {session: true})(req,res,() => {
                    LOGGER.info("LDAP get User ", req.body.login);
                    let userFromBase = UserService.getUserFromDb(req.body.login);
                    if (!userFromBase) {
                        userFromBase = {
                            id : req.body.login,
                            displayName :req.body.login
                        };
                        UserService.createUserIntoDb(userFromBase);
                    }
                    req.logIn(userFromBase, function (err) {
                        if (err) {
                            throw err;
                        }
                        res.send('OK');
                    });
                });
            });
        }
    }
}
