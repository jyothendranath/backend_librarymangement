const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const { strictEqual } = require("assert");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing orders", function () {
  it("get all orders", (done) => {
    chai
      .request(app)
      .get("/orders")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = "";

  it("post order", (done) => {
    let order = {
      date: "Wed, 27 Jun 2022 07:00:00 GMT",
      username: "bada",
      return: "false",
      bookId: "624b0643636498f8f0693cd9",
    };
    chai
      .request(app)
      .post("/orders")
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id;
        done();
      });
  });

  it("get order by id", (done) => {
    chai
      .request(app)
      .get("/orders/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch order", (done) => {
    chai
      .request(app)
      .patch("/orders/" + id)
      .send({ return: false })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete order", (done) => {
    chai
      .request(app)
      .delete("/orders/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
