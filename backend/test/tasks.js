const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const { validAuthHeader } = require("./common");

chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  /**
   * Test the GET route
   */
  let path = "/api/tasks";
  describe("GET /api/tasks", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .get(path)
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it("It should return an array", (done) => {
      chai
        .request(server)
        .get(path)
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.a("array");
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */

  describe("GET /api/tasks/:id", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .get("/api/tasks/5")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it(`It should return status 404 because the task with id 51241 was not found`, (done) => {
      chai
        .request(server)
        .get("/api/tasks/51241")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it("It should return an object with id 5", (done) => {
      chai
        .request(server)
        .get("/api/tasks/5")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").which.equals(5);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */

  describe("POST /api/tasks", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it(`It should return status 400 because the request body was empty`, (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 400 because the title was empty`, (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .set("Authorization", validAuthHeader)
        .send({ title: "", description: "testing task", expiresAt: new Date() })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 201 and the created task`, (done) => {
      const sendData = {
        title: "Testing Task",
        description: "testing task",
        expiresAt: new Date(),
      };
      chai
        .request(server)
        .post("/api/tasks")
        .set("Authorization", validAuthHeader)
        .send(sendData)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.have
            .property("title")
            .which.equals(sendData.title);
          response.body.should.have
            .property("description")
            .which.equals(sendData.description);
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */

  describe("DELETE /api/tasks/:id", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .delete("/api/tasks/6")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });
});
