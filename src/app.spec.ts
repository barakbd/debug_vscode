// process.env.NODE_ENV = "TEST";
console.log("app.spec.ts - sdfsfddsfsdf");
import * as mocha from "mocha";
// const chai = require("chai")
// import * as chai from 'chai';
import { use, request, expect, assert, should } from "chai";
import chaiHttp = require("chai-http");
// import chaiHttp = require("chai-http");
// import * as supertest from "supertest";
import { app } from "./app";
use(chaiHttp);
describe("GET /test", () => {
  it("it should get a folder named 'All Files' ", () => {
    const string: string = "my_name";
    request(app)
      .get(`/test/${string}`)
      //   .expect(200)
      .end((err, res) => {
        console.log("app - ", app);
        try {
          expect(200);
          expect(res.body).to.not.equal(null);
          expect(res.body).to.be(`{message: Hello from ${string}!}`);

          //   done();
        } catch (err) {
          //   done(e);
        }
      });
  });
});
