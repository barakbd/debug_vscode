// require controllers and store in variable in order to call
const usersController = require("../controllers/usersController.js")


module.exports = function (app) {

    //----------------- users routes ------------------
    //create new user
    app.post('/users', function (req, res) {
        usersController.create(req, res);
    });
    //get all users
    app.get('/users', function (req, res) {
        usersController.index(req, res);
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
    //create new user
    app.post('/wheights', function (req, res) {
        usersController.create(req, res);
    });
    //get all users
    app.get('/wheights', function (req, res) {
        usersController.index(req, res);
    });

    //get one user
    app.get('/wheights/:username', function (req, res) {
        usersController.get(req, res);
    });

    //delete user
    app.delete('/wheights/:username', function (req, res) {
        usersController.delete(req, res);
    });


}; //END ROUTES EXPORT
