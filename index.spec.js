const request = require('supertest');
const { expect } = require("chai");
const server = request.agent('http://localhost:8080');
const { app } = require("./bin/www");




describe('GET /', () => {
  it('index page should respond with status code of 404', (done) => {
    server
      .get("/")
      .expect(404)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });

    it("should respond with json - /semester/week/subway", done => {
      server
        .get("/semester/week/subway")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /semester/week/shuttlecock_i", done => {
      server
        .get("/semester/week/shuttlecock_i")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /semester/week/shuttlecock_o", done => {
      server
        .get("/semester/week/shuttlecock_o")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /semester/week/giksa", done => {
      server
        .get("/semester/week/giksa")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /semester/week/yesulin", done => {
      server
        .get("/semester/week/yesulin")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation/week/subway", done => {
      server
        .get("/vacation/week/subway")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation/week/shuttlecock_i", done => {
      server
        .get("/vacation/week/shuttlecock_i")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation/week/shuttlecock_o", done => {
      server
        .get("/vacation/week/shuttlecock_o")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation/week/giksa", done => {
      server
        .get("/vacation/week/giksa")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation/week/yesulin", done => {
      server
        .get("/vacation/week/yesulin")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation_session/week/subway", done => {
      server
        .get("/vacation_session/week/subway")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation_session/week/shuttlecock_i", done => {
      server
        .get("/vacation_session/week/shuttlecock_i")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation_session/week/shuttlecock_o", done => {
      server
        .get("/vacation_session/week/shuttlecock_o")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation_session/week/giksa", done => {
      server
        .get("/vacation_session/week/giksa")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });

    it("should respond with json - /vacation_session/week/yesulin", done => {
      server
        .get("/vacation_session/week/yesulin")
        .expect("Content-Type", /json/)
        .expect(200 || 201)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });


});