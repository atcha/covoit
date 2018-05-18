//Thanks to Christophe Genin : https://github.com/cgenin/tomcat-deploy-web/blob/master/server/deploydb.js
import LokiJs from 'lokijs';
import LOGGER from './logger';

class DeployDB {

    constructor() {
        //Collections
        this.usersCollection = 'users';
        const path = `${process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']}\\AppData\\Roaming\\npm\\covoit.db`;
        this.db = new LokiJs(path);
    }


    createIfNotExist(name) {
        LOGGER.debug(`CreateIfNotExist : ${name}`);
        if (!this.db.getCollection(name)) {
            this.db.addCollection(name);
            this.db.saveDatabase();
        }
    }

    init() {
        return new Promise((success) => {
            this.db.loadDatabase({}, () => {
                this.createIfNotExist(this.usersCollection);
                success(this.db);
            });
        });
    }

    getUsers() {
        return this.db.getCollection(this.usersCollection);
    }

    insert(collection, item) {
        collection.insert(item);
        this.db.saveDatabase();
    }

    save(collection, item) {
        if (item.$loki) {
            collection.update(item);
        } else {
            collection.insert(item);
        }
        this.db.saveDatabase();
    }

    updateStatus(collection, item, state, host) {
        if (item.$loki) {
            const filter = collection.data.filter((i) => i.$loki === item.$loki);
            if (filter && filter.length > 0) {
                const selected = filter[0];
                selected.deployStates = selected.deployStates || {};
                selected.deployStates[host] = {
                    state, dt: new Date()
                };
                collection.update(selected);
                this.db.saveDatabase();
                return selected;
            }
        }
        return item;
    }

    remove(collection, item) {
        collection.remove(item);
        this.db.saveDatabase();
    }

    close() {
        this.db.close();
    }
}

/* ************************************************************************
 SINGLETON CLASS DEFINITION
 ************************************************************************ */
let instance = null;

/**
 * Singleton getInstance definition
 * @return DeployDB class
 */

function getInstance() {
    if (instance === null) {
        instance = new DeployDB();
    }
    return instance;
};


export default getInstance();
