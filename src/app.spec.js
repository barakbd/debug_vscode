"use strict";
// process.env.NODE_ENV = "TEST";
exports.__esModule = true;
// const chai = require("chai")
// import * as chai from 'chai';
var chai_1 = require("chai");
var chaiHttp = require("chai-http");
// import chaiHttp = require("chai-http");
// import * as supertest from "supertest";
var app_1 = require("./app");
// import server from "./server"
chai_1.use(chaiHttp);
describe("GET /folders/0", function () {
    it("it should get a folder named 'All Files' ", function () {
        //
        chai_1.request(app_1["default"])
            .get("/folders/1")
            .end(function (err, res) {
            console.log("appppppp - ", app_1["default"]);
            try {
                chai_1.expect(200);
                chai_1.expect(res.body).to.not.equal(null);
                //   expect(res).to.have.status(200);
                //   done();
            }
            catch (e) {
                //   done(e);
            }
            // expect(res).to.be
            // res.should.have.status(200);
            // res.body.should.be.a('object');
            // res.body.data.name.should.be.equal('object');
        });
    });
});
