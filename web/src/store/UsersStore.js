let instance;

class UsersStore {
  constructor() {
    this._user = null;
    if (instance) {
      return instance;
    }
    instance = this;
  }

  get user(){
    return this._user;
  }

  async getUser($http, reload) {
    if (!this._user || reload) {
      this._user = (await $http.get('/api/users/current')).body;
    }
    return this._user;
  }
}

export default new UsersStore();
