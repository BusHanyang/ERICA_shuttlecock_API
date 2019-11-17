const request = require('supertest');
const { expect } = require("chai");
const server = request.agent('http://localhost:3000');
const { app } = require("./index");




describe('GET /', () => {
  it('should respond with status code of 200', (done) => {
    server
      .get("/semester/week/subway")
      .expect(200 || 201)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });

    it("should respond with json", done => {
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
});