## Synopsis
Box-CDT Integration
## Code Example
```javascript
```
## Motivation
Allow users to upload/link files related questions
## Installation
### Run
npm i (npm install)<br />
node (nodemon) server.js
requires box_config_managed_user.json and box_config_service_account.json in the root folder
### Test with curl or Postman:
**URL:** http://localhost:3200
<br />
### ENDPOINTS:
/box
#### createNewUser:
**endpoint:** /linkCardFolder<br />
**Method:** Get <br />
**origin** https://account.box.com/api/oauth2/authorize?response_type=code&client_id=yr0qscc10huy7av717zcy2szolrlnq9i&box_login=user@cisco.com&redirect_uri=http://localhost:3200/box/linkCardFolder/Pseud

## Tests
npm test (uses mocha, chai and chai-http)

## License
MIT License<br />