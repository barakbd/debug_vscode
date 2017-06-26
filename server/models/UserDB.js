// https://www.sitepoint.com/javascript-design-patterns-singleton/
const util = require('util')
const utilOptions = {
  showHidden: false,
  depth: 2
}

class UserStore {
  constructor() {
    if (!UserStore.UserDB) {
      this._data = [];
      UserStore.UserDB = this;
    }

    return UserStore.UserDB;
  }

  set(newUser) {
    console.log("UserDB.set(user) - " + util.inspect(newUser, utilOptions))
    return new Promise(resolve =>{
      setTimeout(() => {
        console.log("UserDB.set(user) - this._data - " + util.inspect(this._data, utilOptions));
        this
          ._data
          .push(newUser);
        resolve(newUser)
      }, 3000)
    })
  }

  get(username) {
    console.log("UserDB.get(username) - " + username)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("UserDB.get - inside timeOut - this - " + util.inspect(this._data, utilOptions))
        let searchNewUser = new Promise((resolve) => {
          // console.log("UserDB.get - userFound - resolve")
          resolve(this._data.find(user => user.username === username))
        });
        searchNewUser.then((user) => {
          if (user != undefined) {
            console.log("UserDB.get(username) - resolve")
            resolve(user)
          } else {
            console.log("UserDB.get(username) - reject")
            reject(user)
          }
        })
      }, 3000) // end timeOut
    }) //end Promise

  }
} // end class UserStore

const UserDB = new UserStore();
Object.freeze(UserDB);

module.exports = UserDB