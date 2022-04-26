const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing Users", function () {
  it("get all users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = "";

  it("post user", (done) => {
    let user = {
      username: "spiderman",
      password: "peter@123",
      isAdmin: false,
    };
    chai
      .request(app)
      .post("/users")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id;
        done();
      });
  });

  it("get user by id", (done) => {
    chai
      .request(app)
      .get("/users/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch user", (done) => {
    chai
      .request(app)
      .patch("/user/" + id)
      .send({ password: "mj@143" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete user", (done) => {
    chai
      .request(app)
      .delete("/users/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
