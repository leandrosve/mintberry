const { util } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { after } = require("mocha");
const server = require("../src/app");
const RefreshToken = require("../src/db/models/RefreshToken");
const User = require("../src/db/models/User");
const { validRefreshToken, validAuthHeader } = require("./premises");

const unknownRefreshToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJuYW1lIjoibGVhbmRybyIsImVtYWlsIjoibGVhbmRyb0BnbWFpbC5jb20iLCJpYXQiOjE2MDM3NDM0MDF9.YjWVcTI64X52VA8ISwLleqO76RhkW9-K10JxhFONlVY";
chai.should();

chai.use(chaiHttp);

const destroyUserWithEmail = async (email) => {
  try {
    await User.destroy({ where: { email } });
  } catch {
    () => {
      console.log("Error while trying to destroy user from database.");
    };
  }
};

describe("Users API", () => {
  before(async () => {
    try {
      await RefreshToken.create({ token: validRefreshToken });
    } catch (error) {console.log(error)}
  });
  after(async () => {
    try {
      destroyUserWithEmail("lalalala123@gmail.com");
      await RefreshToken.destroy({ where: { token: [validRefreshToken] } });
    } catch (error) {
      console.log(error);
      console.log("Error in [after] cleanup");
    }
  });
  afterEach(function(){
    if (this.currentTest.state == 'failed') { 
      console.log("    Response body: " + util.inspect(response.body,{depth: null, colors: true}) + "\n");
    }
  })

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
        .send(signupInfo)
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
        });
    });
  });

  describe("POST /api/users/token", () => {
    it("It should fail and return status 400 because the request body is empty", (done) => {
      chai
        .request(server)
        .post("/api/users/token")
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 400 because no user info can be extracted from the token", (done) => {
      chai
        .request(server)
        .post("/api/users/token")
        .send({ refreshToken: "asdasdasdas" })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it("It should fail and return status 401 because the refresh token is not in the server", (done) => {
      chai
        .request(server)
        .post("/api/users/token")
        .send({ refreshToken: unknownRefreshToken })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it("It return status 200 and both the new access token and refresh token", (done) => {
      chai
        .request(server)
        .post("/api/users/token")
        .send({ refreshToken: validRefreshToken })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property('accessToken').which.is.a("string");
          response.body.should.have.property('refreshToken').which.is.a("string");
          done();
        });
    });
  });

  describe("GET /api/users/me", () => {  
    it("It should fail because it's unauthorized", (done) => {
      chai
        .request(server)
        .get("/api/users/me")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it("It should return status 200 and the user info", (done) => {
      chai
        .request(server)
        .get("/api/users/me")
        .set("Authorization", validAuthHeader)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have.property("id").which.is.a("number");
          response.body.should.have.property("username").which.is.a("string");
          response.body.should.have.property("email").which.is.a("string");
          done();
        });
    });
  });
});
