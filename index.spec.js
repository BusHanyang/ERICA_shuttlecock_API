const request = require('supertest');
const { expect } = require("chai");
const server = request.agent('http://localhost:3000');
const { app } = require("./index");




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
        .get("/semester/week/subway")
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
        .get("/semester/week/shuttlecock_i")
        .expect("Content-Type", /json/)
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
        .get("/semester/week/shuttlecock_o")
        .expect("Content-Type", /json/)
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
        .get("/semester/week/giksa")
        .expect("Content-Type", /json/)
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
        .get("/semester/week/yesulin")
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });
});