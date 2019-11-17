const request = require('supertest');
const { expect } = require("chai");
const server = request.agent('http://localhost:3000');

describe('GET /', () => {
  it("should respond with json", done => {
    server

      .get("/semester/week/subway")
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        expect("Content-Type", /json/);
        done();
      });
  }).timeout(5000);
});