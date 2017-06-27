// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET users', () => {
    it('it should GET no users', (done) => {
        chai
            .request(server)
            .get('/users/John')
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200);
                res
                    .body
                    .should
                    .be
                    .a('string');
                res
                    .body
                    .should
                    .equal("User not found")
                done();
            });
    });
});
/* describe('/GET users', () => {
    it('it should GET no users', (done) => {
        chai
            .request(server)
            .get('/users/John')
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
 */