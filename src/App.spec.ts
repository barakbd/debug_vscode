// process.env.NODE_ENV = "TEST";

import * as mocha from "mocha";
// const chai = require("chai")
// import * as chai from 'chai';
import { use, request, expect, assert, should } from "chai";
import chaiHttp = require("chai-http");
// import chaiHttp = require("chai-http");
// import * as supertest from "supertest";
import app from "./app";
// import server from "./server"
use(chaiHttp);
describe("GET /folders/0", () => {
  it("it should get a folder named 'All Files' ", () => {
    //
    request(app)
      .get("/folders/1")
      //   .expect(200)
      .end((err, res) => {
        console.log("appppppp - ", app);
        try {
          expect(200);
          expect(res.body).to.not.equal(null);
          //   expect(res).to.have.status(200);
          //   done();
        } catch (e) {
          //   done(e);
        }

        // expect(res).to.be
        // res.should.have.status(200);

        // res.body.should.be.a('object');
        // res.body.data.name.should.be.equal('object');
      });
  });
});
