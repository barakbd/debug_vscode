// https://www.sitepoint.com/javascript-design-patterns-singleton/
const util = require('util')
const utilOptions = {
  showHidden: false,
  depth: 2
}
var simulateAsyncCall = function (params, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(callback, 3000)
  })
}

class UserStore {
  constructor() {
    if (!UserStore.UserDB) {
      this._data = [
        {
          username: 'John',
          createdAt: "2017-06-27T18:53:33.861Z"
        }
      ];
      UserStore.UserDB = this;
    }

    return UserStore.UserDB;
  }

  set(newUser) {
    console.log("UserDB.set(user) - " + util.inspect(newUser, utilOptions))
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("UserDB.set(user) - this._data - " + util.inspect(this._data, utilOptions));
        this
          ._data
          .push(newUser);
          resolve({newUserAdded: newUser})
      }, 3000)
    })
  }

  get(username) {
    console.log("UserDB.get(username) - " + username)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("UserDB.get - inside timeOut - this._data - " + util.inspect(this._data, utilOptions))
        let searchNewUser = new Promise((resolve) => {
          /*
          For supporting non ES6/Node v6.x
          resolve(() => {
            for (var i = 0; i < this._data.length; i++) {
              if (this._data[i].hasOwnProperty("username") && this._data[i]["username"].toLowerCase() === username.toLowerCase()) {
                return (this._data[i])
              }
            }

          })
 */
          resolve(this._data.find(user => user.username.toLowerCase() === username.toLowerCase()))
        });
        searchNewUser.then((user) => {
          if (user != undefined) {
            console.log("UserDB.get(username) - resolve")
            resolve(user)
          } else {
            console.log("UserDB.get(username) - reject")
            reject({error: "user does not exists"})
          }
        })
      }, 3000) // end timeOut
    }) //end Promise

  }
} // end class UserStore

const UserDB = new UserStore();
Object.freeze(UserDB);

module.exports = UserDB