## Synopsis
An example of an node/express server written in ES6/Node v6.x, with in-memory databse data structures. Implemneted some checks on endpoints and in controllers to verify requests format. Used promises and setTimeout to simulate async API and DB calls.

## Code Example
```javascript
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
```
## Motivation
job interview :)<br />
<br />
## Installation
### Run
npm i (npm install)<br />
node (nodemon) server.js<br />

###Test with curl or Postman:
**URL:** http://localhost:8000<br />
<br />
**ENDPOINTS:**<br />
<br />
###createNewUser:
**endpoint:** /users<br />
**Method:** Post <br />
**body example:** {"username": "Mark"}<br />

###getUser:
**endpoint:** /users/:username<br />
**Method:** Get<br />
**url example:** /users/:username<br />

###createWheightForUser:
endpoint: /wheights/:username<br />
Method: Post <br />
url example: /wheights/Mark<br />
body example: {"wheight": 222}<br />

###getWheightsForUser (with query for average):
endpoint: /wheights/:username<br />
Method: Get<br />
url example: /wheights/Mark<br />
url example with query: /wheights/Mark?options=average<br />

## Tests
npm test (uses mocha, chai and chai-http)<br />

## License
MIT License<br />