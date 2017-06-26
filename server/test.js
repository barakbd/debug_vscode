// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET users', () => {
    it('it should GET all users', (done) => {
        chai
            .request(server)
            .get('/users')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200);
                res
                    .body
                    .should
                    .be
                    .a('array');
                res
                    .body
                    .length
                    .should
                    .be
                    .eql(0);
                done();
            });
    });
});
