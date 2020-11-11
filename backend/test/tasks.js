const { util } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const { Task} = require("../src/db/models");

const {
  testHeroId,
  testVillainId,
  testHeroValidAuthHeader,
} = require("./premises");

chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  before(async () => {
    try {
      
      await Task.destroy({ where: { id: 1 } });

      await Task.destroy({ where: { id: 2 } });

      await Task.destroy({ where: { id: 3 } });

      
      
      //creates test hero's task
      await Task.create({
        id: 1,
        userId: testHeroId,
        title: "testHero's task",
        description: "this is a test task",
        expiresAt: new Date(),
      });
      //creates test hero's task
      await Task.create({
        id: 3,
        userId: testHeroId,
        title: "testHero's cancelled task",
        status: "CANCELLED",
        description: "this is a cancelled test task",
        expiresAt: new Date(),
      });
      //creates test villain's task
      await Task.create({
        id: 2,
        userId: testVillainId,
        title: "testVillain's task",
        description: "this is a test task",
        expiresAt: new Date(),
      });

    } catch (error) {
      console.log("Error at [before] statement while trying to create a task.");
      console.log(error);
    }
  });

  /**
   * Test the GET route
   */

  describe("GET /api/tasks", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it("It should return an array", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .set("Authorization", testHeroValidAuthHeader)
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
        .get("/api/tasks/")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it(`It should return status 404 because the task with id 51241 was not found`, (done) => {
      chai
        .request(server)
        .get("/api/tasks/51241")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it(`It should return status 403 because the requested task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .get("/api/tasks/2")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });

    it("It should return an object with id 1", (done) => {
      chai
        .request(server)
        .get("/api/tasks/1")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").which.equals(1);
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
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 400 because the title was empty`, (done) => {
      chai
        .request(server)
        .post("/api/tasks")
        .set("Authorization", testHeroValidAuthHeader)
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
        .set("Authorization", testHeroValidAuthHeader)
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
   * Test the POST by id and action route
   */

  describe("POST /api/tasks/:id/:action", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/pause")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .post(`/api/tasks/2/pause`)
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it(`It should return status 400 because the action is invalid`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/lalalala")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 200 and the updated task with PAUSED status`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/pause")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(1);
          response.body.should.have.property("status").which.equals("PAUSED");
          done();
        });
    });
    it(`It should return status 200 and the updated task with RUNNING status`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/start")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(1);
          response.body.should.have.property("status").which.equals("RUNNING");
          done();
        });
    });
    it(`It should return status 200 and the updated task with FINISHED status and when it was finished`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/finish")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(1);
          response.body.should.have.property("status").which.equals("FINISHED");
          response.body.should.have.property("finishedAt").which.is.not.null;
          done();
        });
    });
    it(`It should return status 400 because a finished task cannot be started again`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/1/finish")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 400 because a cancelled task cannot be finished`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/3/finish")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 400 because a cancelled task cannot be started again`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/3/start")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
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
    it("It should return 404 because the task is not found", (done) => {
      chai
        .request(server)
        .delete("/api/tasks/32123")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .delete("/api/tasks/2")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it(`It should return status 200 and the deleted task`, (done) => {
      chai
        .request(server)
        .delete("/api/tasks/3")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.is.a("number");
          done();
        });
    });
  });

  /**
   * Test the PATCH  by id route
   */

  describe("PATCH /api/tasks/:id", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .patch("/api/tasks/2")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it("It should fail and return status 400 because the request body is empty.", (done) => {
      chai
        .request(server)
        .patch("/api/tasks/1")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/2")
        .set("Authorization", testHeroValidAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });

    it(`It should return status 400 because the title is empty`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/1")
        .set("Authorization", testHeroValidAuthHeader)
        .send({ title: "", description: "this description has been modified" })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 200 and the modified task info`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/1")
        .set("Authorization", testHeroValidAuthHeader)
        .send({
          title: "This title has been modified",
          description: "this description has been modified",
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(1);
          response.body.should.have
            .property("title")
            .which.equals("This title has been modified");
          response.body.should.have
            .property("description")
            .which.equals("this description has been modified");
          done();
        });
    });
  });
});
