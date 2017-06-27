// require controllers and store in variable in order to call
const usersController = require("../controllers/usersController.js")
const wheightsController = require("../controllers/wheightsController.js")


module.exports = function (app) {

    //----------------- users routes ------------------
    //create new user
    app.post('/users', function (req, res) {
        usersController.create(req, res);
    });

    //get one user
    app.get('/users/:username', function (req, res) {
        usersController.get(req, res);
    });

    //delete user
    app.delete('/customers/:username', function (req, res) {
        usersController.delete(req, res);
    });
    //----------------- wheight routes ------------------
    //create new wheight
    app.post('/wheights/:username', function (req, res) {
        wheightsController.create(req, res);
    });

    //get wheights for user
    app.get('/wheights/:username', function (req, res) {
        wheightsController.get(req, res);
    });

    //delete wheight for user
    app.delete('/wheights/:username', function (req, res) {
        wheightsController.delete(req, res);
    });


}; //END ROUTES EXPORT
