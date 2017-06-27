// https://www.sitepoint.com/javascript-design-patterns-singleton/
const util = require('util')
const utilOptions = {
  showHidden: false,
  depth: 3
}
/*
var simulateAsyncCall = function (params, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(callback, 3000)
  })
}
 */
class WheightStore {
  constructor() {
    if (!WheightStore.WheightDB) {
      this._data = {
        "John": [
          {
            "wheight": 10,
            "createdAt": "2017 - 06 - 27 T21: 48: 15.837 Z"
          }
        ]
      };
      WheightStore.WheightDB = this;
    }

    return WheightStore.WheightDB;
  }

  set(username, newWheight) {
    console.log("WheightDB.set(username, newWheight) - username- " + util.inspect(username, utilOptions))
    console.log("WheightDB.set(username, newWheight) - newWheight - " + util.inspect(newWheight, utilOptions))
    console.log(" --------------" + this._data.hasOwnProperty([username]));

    return new Promise(resolve => {
      setTimeout(() => {
        console.log("WheightDB.set - this._data - " + util.inspect(this._data, utilOptions));
        if (!this._data.hasOwnProperty([username])) {
          console.log("First wheight for user")
          this._data[username] = [];
        }
        this
          ._data[username]
          .push(newWheight);
        console.log("new this._data" + util.inspect(this._data, utilOptions))
        console.log(util.inspect(this._data[username], utilOptions))
        resolve({user: username, wheigtsRecorded: this._data[username]})
      }, 3000)
    })
  } //end set

  get(username) {
    console.log("WheightDB.get(username) - " + username)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("WheightDB.get - inside timeOut - this - " + util.inspect(this._data, utilOptions))
        //Define the data search as a promise
        let searchUserWheights = new Promise((resolve, reject) => {
          if (this._data.hasOwnProperty([username])) {
            console.log("WheightDB.get - records found for user" + username)

            resolve({userRecordedWheights: this._data[username]})
          } else {
            console.log("WheightDB.get - NO records found for user" + username)
            reject({userRecordedWheights: "no records found"})
          }
        })
        //Search and resolve/reject the outer promise
        searchUserWheights.then(resolve, userRecordedWheights => {
          console.log("WheightDB.get - out resolve - userRecordedWheights" + util.inspect(userRecordedWheights, utilOptions));
          resolve(userRecordedWheights)
        }).catch(reject, noRecordsFound => {
          console.log("WheightDB.get - out reject - noRecordsFound" + util.inspect(noRecordsFound, utilOptions));
          reject(noRecordsFound)
        })
      }, 3000) // end timeOut
    }) //end Promise

  } //end get

} // end class WheightStore
const WheightDB = new WheightStore();
Object.freeze(WheightDB);

module.exports = WheightDB