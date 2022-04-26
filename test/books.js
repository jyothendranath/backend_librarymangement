const chai = require("chai");
const assert = require("assert");
const app = require("../server");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");

const should = chai.should();
chai.use(chaiHttp);

describe("Testing Books", function () {
  it("get all books", (done) => {
    chai
      .request(app)
      .get("/books")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  let id = ''

  it("post book", (done) => {
    let book = {
      title: "The Amazing SpiderMan",
      author: "Stanlee",
      ISBN: "970-3-69-148260-0",
      publication: "2010",
      link: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.rottentomatoes.com%2Fm%2Fthe_amazing_spider_man&psig=AOvVaw1jEPpfBdevPIodyilKN1gd&ust=1651085091458000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPCJxMGxsvcCFQAAAAAdAAAAABAD",
      addedBy: "kranthi",
    };
    chai
      .request(app)
      .post("/books")
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        id = res.body._id
        done();
      });
  });

  it("get book by id", (done) => {
    chai
      .request(app)
      .get("/books/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("patch book", (done) => {
    chai
      .request(app)
      .patch("/books/" + id)
      .send({ title: "The Chronicles of Narnia" })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("delete book", (done) => {
    chai
      .request(app)
      .delete("/books/" + id)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
