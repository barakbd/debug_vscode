// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

process.env.NODE_ENV = 'test';

let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('/GET users', () => {
    it('it should GET user John', (done) => {
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
                    .a('object');
                res
                    .body
                    .should
                    .deep
                    .equal({
                        "userFound": {
                            "username": "John",
                            "createdAt": "2017-06-27T18:53:33.861Z"
                        }
                    })
            });
        done()
        this.bail()        
    }); 
});
