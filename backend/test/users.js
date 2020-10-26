const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const User = require("../src/db/models/User");

chai.should();

chai.use(chaiHttp);

const destroyUserWithEmail = async (email) =>{
    await User.destroy({where:{email}}).catch(()=>{return})
}

describe("Users API", () => {

    after(()=> destroyUserWithEmail("lalalala123@gmail.com"));

  /**
   * Test the LOGIN route
   */

  describe("POST /api/users/login", () => {
    it("It should fail and return status 400 because the request body is empty", (done) => {
      chai
        .request(server)
        .post("/api/users/login")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should return status 401 because the credentials are invalid", (done) => {
      const loginInfo = {
        email: "avestruz@avestruz.com",
        password: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(loginInfo)
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });

    it("It should return both the accessToken and refreshToken", (done) => {
      const loginInfo = {
        email: "leandro@gmail.com",
        password: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/login")
        .send(loginInfo)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("accessToken")
            .which.is.a("string");
          response.body.should.have
            .property("refreshToken")
            .which.is.a("string");
          done();
        });
    });
  });

  /**
   * Test the SIGNUP route
   */

  describe("POST /api/users/signup", () => {
    it("It should fail and return status 400 because the request body is empty.", (done) => {
      chai
        .request(server)
        .post("/api/users/signup")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the request email is invalid.", (done) => {
      const signupInfo = {
        email: "dasdasdas",
        username: "asdasdas",
        password: "Asdasd123",
        passwordConfirmation: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it("It should fail and return status 400 because the request username is too short.", (done) => {
      const signupInfo = {
        email: "leandro@gmail.com",
        username: "as",
        password: "Asdasd123",
        passwordConfirmation: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the password has no uppercases.", (done) => {
      const signupInfo = {
        email: "leandro@gmail.com",
        username: "leandro",
        password: "asdasd123",
        passwordConfirmation: "asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the password has no numbers.", (done) => {
      const signupInfo = {
        email: "leandro@gmail.com",
        username: "leandro",
        password: "Asdasdasd",
        passwordConfirmation: "Asdasdasd",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the password is too short.", (done) => {
      const signupInfo = {
        email: "leandro@gmail.com",
        username: "leandro",
        password: "Asdasd123",
        passwordConfirmation: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the email is already in use.", (done) => {
      const signupInfo = {
        email: "leandro@gmail.com",
        username: "leandrogadsgasd123312",
        password: "Asdasd123",
        passwordConfirmation: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because the username is already in use.", (done) => {
      const signupInfo = {
        email: "lalalala123@gmail.com",
        username: "leandro",
        password: "Asdasd123",
        passwordConfirmation: "Asdasd123",
      };
      chai
        .request(server)
        .post("/api/users/signup")
        .send(signupInfo)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });

    it("It should return status 201. ", (done) => {
        const signupInfo = {
          email: "lalalala123@gmail.com",
          username: "leandro31213",
          password: "Asdasd123",
          passwordConfirmation: "Asdasd123",
        };
        chai
          .request(server)
          .post("/api/users/signup")
          .send(signupInfo)
          .end((err, response) => {
            response.should.have.status(201);
            done();
          })
      });

  });
});
