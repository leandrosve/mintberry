const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const Task = require("../src/db/models/Task");
const { validAuthHeader, taskOwnerId } = require("./premises");

chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {

  /*
  before(async()=>{
    try {
      await Task.create({id:9999, userId:27, title:"Forbidden Task", description:"forbidden task", expiresAt:new Date()})
    } catch (error) {
      console.log("Error at [before] statement while trying to create a task.");
      console.log(error);
    }
   })
  */

  before(async () => {
    try {
      await Task.create({
        id: 10000,
        userId: taskOwnerId,
        title: "This is gonna be deleted",
        description: "bye bye world",
        expiresAt: new Date(),
      });
      await Task.create({
        id: 10001,
        userId: taskOwnerId,
        title: "This task is cancelled",
        description: "i am cancelled",
        status: "CANCELLED",
        expiresAt: new Date(),
      });
    } catch (error) {
      console.log("Error at [before] statement while trying to create a task.");
      //console.log(error);
    }
  });

  after(async () => {
    try {
      await Task.destroy({ where: { id: 10001 } });
      await Task.destroy({ where: { id: 10000 } });
    } catch (error) {
      console.log("Error at [before] statement while trying to delete a task.");
    }
  });

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
    it(`It should return status 403 because the requested task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .get("/api/tasks/9999")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
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
   * Test the POST by id and action route
   */

  describe("POST /api/tasks/:id/:action", () => {
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .post("/api/tasks/6/pause")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/9999/pause")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it(`It should return status 400 because the action is invalid`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10000/lalalala")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 200 and the updated task with PAUSED status`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10000/pause")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(10000);
          response.body.should.have.property("status").which.equals("PAUSED");
          done();
        });
    });
    it(`It should return status 200 and the updated task with RUNNING status`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10000/start")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(10000);
          response.body.should.have.property("status").which.equals("RUNNING");
          done();
        });
    });
    it(`It should return status 200 and the updated task with FINISHED status and when it was finished`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10000/finish")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.equals(10000);
          response.body.should.have.property("status").which.equals("FINISHED");
          response.body.should.have.property("finishedAt").which.is.not.null;
          done();
        });
    });
    it(`It should return status 400 because a finished task cannot be started again`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10000/finish")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 400 because a cancelled task cannot be finished`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10001/finish")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it(`It should return status 400 because a cancelled task cannot be started again`, (done) => {
      chai
        .request(server)
        .post("/api/tasks/10001/start")
        .set("Authorization", validAuthHeader)
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
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .delete("/api/tasks/9999")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it(`It should return status 200 and the deleted task`, (done) => {
      chai
        .request(server)
        .delete("/api/tasks/10000")
        .set("Authorization", validAuthHeader)
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
        .patch("/api/tasks/6")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it("It should fail and return status 400 because the request body is empty.", (done) => {
      chai
        .request(server)
        .patch("/api/tasks/5")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 403 because the task doesn't belong to the user`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/9999")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });

    it(`It should return status 400 because the title is empty`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/5")
        .set("Authorization", validAuthHeader)
        .send({title: "", description:"this description has been modified"})
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it(`It should return status 200 and the modified task info`, (done) => {
      chai
        .request(server)
        .patch("/api/tasks/5")
        .set("Authorization", validAuthHeader)
        .send({title: "This title has been modified", description:"this description has been modified"})
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('id').which.equals(5);
          response.body.should.have.property('title').which.equals("This title has been modified");
          response.body.should.have.property('description').which.equals("this description has been modified")
          done();
        });
    });
  });

});
