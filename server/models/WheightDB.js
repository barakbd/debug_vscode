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

class WheightStore {
  constructor() {
    if (!WheightStore.WheightDB)
    {
      this._data = {};
      WheightStore.WheightDB = this;
    }

    return WheightStore.WheightDB;
  }

  set(username, newWheight) {
    console.log("WheightDB.set(user) - " + util.inspect(newWheight, utilOptions))
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("WheightDB.set(user) - this._data - " + util.inspect(this._data, utilOptions));
        if (!hasOwnProperty(this._data[username]))
          this
            ._data[username]
            (newWheight);
        resolve(newWheight)
      }, 3000)
    })
  }

  get(username) {
    console.log("WheightDB.get(username) - " + username)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("WheightDB.get - inside timeOut - this - " + util.inspect(this._data, utilOptions))
        let searchNewWheight = new Promise((resolve) => {
          /*
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
        searchNewWheight.then((user) => {
          if (user != undefined)
          {
            console.log("WheightDB.get(username) - resolve")
            resolve(user)
          } else
          {
            console.log("WheightDB.get(username) - reject")
            reject(user)
          }
        })
      }, 3000) // end timeOut
    }) //end Promise

  }
} // end class WheightStore

const WheightDB = new WheightStore();
Object.freeze(WheightDB);

module.exports = WheightDB